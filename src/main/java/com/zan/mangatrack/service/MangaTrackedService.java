package com.zan.mangatrack.service;

import com.zan.mangatrack.business.MangaBo;
import com.zan.mangatrack.business.MangaTrackedBo;
import com.zan.mangatrack.business.User;
import com.zan.mangatrack.business.UserPrincipal;
import com.zan.mangatrack.repository.MangaTrackedRepository;
import com.zan.mangatrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MangaTrackedService {

    @Autowired
    MangaTrackedRepository mangaTrackedRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MangaService mangaService;

    public List<MangaTrackedBo> list() {
        return this.mangaTrackedRepository.findAll();
    }

    public Optional<MangaTrackedBo> get(final long id) {
        return this.mangaTrackedRepository.findById(id);
    }

    public MangaTrackedBo persist(final MangaTrackedBo mangaTrackedBo, final UserPrincipal currentUser) throws Exception {
        Optional<User> retrievedUser = userRepository.findById(currentUser.getId());

        List<MangaTrackedBo> retrievedmanga =
                mangaTrackedRepository.findByMangaTrackedIdAndUser(mangaTrackedBo.getMangaTrackedId(), retrievedUser.get());

        if (!retrievedmanga.isEmpty()) {
            throw new Exception("Manga with id " + mangaTrackedBo.getId() + " already tracked.");
        }

        mangaTrackedBo.setUser(retrievedUser.get());
        return this.mangaTrackedRepository.save(mangaTrackedBo);
    }

    public MangaTrackedBo updateLastChapterRead(
            final long id,
            final double lastChapterRead,
            final UserPrincipal currentUser) throws Exception {

        Optional<User> retrievedUser = userRepository.findById(currentUser.getId());

        if (retrievedUser.isPresent() && currentUser.getId() != retrievedUser.get().getId()) {
            throw new Exception("Not authorized to update this manga.");
        }

        List<MangaTrackedBo> retrievedmanga =
                mangaTrackedRepository.findByMangaTrackedIdAndUser(id, retrievedUser.get());

        if (retrievedmanga.isEmpty()) {
            throw new Exception("Manga with id " + id + " not found.");
        }

        retrievedmanga.get(0).setLastChapterRead(lastChapterRead);

        return retrievedmanga.get(0);
    }

    public MangaTrackedBo getUpdatedInformations(final long id, final UserPrincipal currentUser)
            throws Exception {

        // manga with fresh informations from mangadex api
        MangaBo manga = mangaService.getUpdatedInformations(id);

        Optional<User> retrievedUser = userRepository.findById(currentUser.getId());

        List<MangaTrackedBo> retrievedmangas =
                mangaTrackedRepository.findByMangaTrackedIdAndUser(id, retrievedUser.get());

        if (retrievedmangas.isEmpty()) {
            throw new Exception("Manga with id " + id + " is not tracked.");
        }

        MangaTrackedBo mangaTracked = retrievedmangas.get(0);

        // update manga tracked with fresh informations
        mangaTracked.setAuthor(manga.getAuthor());
        mangaTracked.setFinished(manga.isFinished());
        mangaTracked.setImgSrc(manga.getImgSrc());
        mangaTracked.setLastChapterOut(manga.getLastChapterOut());

        // update last fetch for current user
        retrievedUser.get().setLastFetchInformations(LocalDateTime.now());

        return mangaTracked;
    }
}
