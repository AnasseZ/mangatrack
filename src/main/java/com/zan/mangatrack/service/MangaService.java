package com.zan.mangatrack.service;

import com.zan.mangatrack.business.MangaBo;
import com.zan.mangatrack.provider.MangadexProvider;
import com.zan.mangatrack.repository.MangaRepository;
import com.zan.mangatrack.repository.MangaTrackedRepository;
import com.zan.mangatrack.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class MangaService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MangaService.class);

    @Autowired
    MangaRepository mangaRepository;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    MangadexProvider mangadexProvider;

    @Autowired
    MangaTrackedRepository mangaTrackedRepository;

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }


    public List<MangaBo> list() {
        return this.mangaRepository.findAll();
    }

    public Optional<MangaBo> get(final long id) {
        return this.mangaRepository.findById(id);
    }

    public Page<MangaBo> search(final String title, final int page) {
        Pageable pageable = PageRequest.of(page, AppConstants.PAGE_SIZE, Sort.Direction.ASC, "title");

        return this.mangaRepository.findByKeywords(title.toLowerCase(), pageable);
    }

    public List<MangaBo> saveMangadexManga(final long min, final long max) throws IOException {
        List<MangaBo> mangaBos = new ArrayList<>();

        for (long i = min; i <= max; i++) {
            try {
                // query mangadex API with id
                String mangadexResponse = restTemplate.getForObject(AppConstants.MANGADEX_API_ROOT + i, String.class);

                if (mangadexResponse != null) {
                    // create well formated manga object from response for current manga
                    mangaBos.add(mangadexProvider.createMangaFromJson(i, mangadexResponse));
                }

            } catch (HttpClientErrorException e) {
                LOGGER.error("id " + i + " hasn't any manga linked.");
            }
        }

        return mangaRepository.saveAll(mangaBos);
    }

    public MangaBo getUpdatedInformations(final long id) throws IOException {
        String mangadexResponse = restTemplate.getForObject(AppConstants.MANGADEX_API_ROOT + id, String.class);
        if (mangadexResponse == null) {
            throw new IOException("Can't get resource from Mangadex API.");
        }

        return mangadexProvider.createMangaFromJson(id, mangadexResponse);
    }

    /**
     * Function called every 60 minutes
     * Fetch mangas which are followed by user and not finished
     *
     * @throws IOException
     */
    @Scheduled(fixedDelay = 24 * 60 * 60 * 1000)
    public void updateFollowedMangas() throws IOException {

        // get distinct mangas which are not finished
        List<MangaBo> distinctMangas = mangaTrackedRepository.findDistinctManga()
                .stream().filter(distinctManga -> !distinctManga.isFinished())
                .collect(Collectors.toList());

        for (MangaBo distinctManga : distinctMangas) {
            // get each updated manga from external api
            MangaBo updatedMangaFromApi = getUpdatedInformations(distinctManga.getMangaTrackedId());

            // update in db
            distinctManga.setAuthor(updatedMangaFromApi.getAuthor());
            distinctManga.setFinished(updatedMangaFromApi.isFinished());
            distinctManga.setImgSrc(updatedMangaFromApi.getImgSrc());
            distinctManga.setLastChapterOut(updatedMangaFromApi.getLastChapterOut());

            mangaRepository.save(distinctManga);
        }
    }
}
