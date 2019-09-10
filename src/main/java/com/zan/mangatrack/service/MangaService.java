package com.zan.mangatrack.service;

import com.zan.mangatrack.business.MangaBo;
import com.zan.mangatrack.business.mangadex.MangadexManga;
import com.zan.mangatrack.business.mangadex.MangadexResponse;
import com.zan.mangatrack.repository.MangaRepository;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MangaService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MangaService.class);

    @Autowired
    MangaRepository mangaRepository;

    @Autowired
    RestTemplate restTemplate;

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

    public List<MangaBo> saveMangadexManga(final long min, final long max) {
        List<MangaBo> mangaBos = new ArrayList<>();

        for (long i = min; i <= max ; i++) {
            try {
                MangadexResponse mangadexResponse = restTemplate.getForObject(AppConstants.MANGADEX_API_ROOT + i, MangadexResponse.class);

                if(mangadexResponse != null)  {
                    MangaBo mangaBo = new MangaBo(mangadexResponse.getManga(), i);
                    mangaBos.add(mangaBo);
                    LOGGER.info(mangaBo.getTitle() + " with id " + i + " is fetched.");
                }
            } catch (HttpClientErrorException e) {
                LOGGER.error("id " + i + " hasn't any manga linked.");
            }
        }

        return mangaRepository.saveAll(mangaBos);
    }
}
