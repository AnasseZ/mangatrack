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

    public List<MangaTrackedBo> list(final long userId) throws Exception {

        User retrievedUser = userRepository
                .findById(userId)
                .orElseThrow(() -> new Exception("User doesn't exists."));


        return this.mangaTrackedRepository.findByUser(retrievedUser);
    }

    public MangaTrackedBo get(final long id) throws Exception {
        return this.mangaTrackedRepository.findById(id).orElseThrow(() -> new Exception("Tracked Manga not found."));
    }

    public MangaTrackedBo persist(final MangaTrackedBo mangaTrackedBo, final UserPrincipal currentUser) throws Exception {
        Optional<User> retrievedUser = userRepository.findById(currentUser.getId());

        // check if manga exist
        MangaBo retrievedManga = mangaService
                .get(mangaTrackedBo.getManga().getId())
                .orElseThrow(() -> new Exception("Manga does not exist."));

        // check if manga already tracked
        List<MangaTrackedBo> followedMangasWithMangaId =
                mangaTrackedRepository.findByMangaAndUser(retrievedManga, retrievedUser.get());

        if (!followedMangasWithMangaId.isEmpty()) {
            throw new Exception("Manga " + retrievedManga.getTitle() + " already tracked.");
        }

        mangaTrackedBo.setManga(retrievedManga);
        mangaTrackedBo.setUser(retrievedUser.get());

        return this.mangaTrackedRepository.save(mangaTrackedBo);
    }

    public MangaTrackedBo updateLastChapterRead(
            final long id,
            final double lastChapterRead,
            final UserPrincipal currentUser) throws Exception {

        User retrievedUser = userRepository
                .findById(currentUser.getId())
                .orElseThrow(() -> new Exception("User doesn't exists."));

        // check if tracked manga exists
        List<MangaTrackedBo> retrievedmangas =
                mangaTrackedRepository.findByIdAndUser(id, retrievedUser);

        if (retrievedmangas.isEmpty()) {
            throw new Exception("Manga with id " + id + " not found.");
        }

        // we know we can track only one manga so if not empty there is only one element
        MangaTrackedBo retrievedmanga = retrievedmangas.get(0);

        // check if has right to update manga
        if (retrievedmanga.getUser().getId() != retrievedUser.getId()) {
            throw new Exception("Not authorized. Can't update manga.");
        }

        // update chapter
        retrievedmanga.setLastChapterRead(lastChapterRead);

        return retrievedmanga;
    }

    public MangaTrackedBo getUpdatedInformations(final long id, final UserPrincipal currentUser)
            throws Exception {

        // manga with fresh informations from mangadex api
        MangaBo manga = mangaService.getUpdatedInformations(id);

        Optional<User> retrievedUser = userRepository.findById(currentUser.getId());

        List<MangaTrackedBo> retrievedmangas =
                mangaTrackedRepository.findByIdAndUser(id, retrievedUser.get());

        if (retrievedmangas.isEmpty()) {
            throw new Exception("Manga with id " + id + " is not tracked.");
        }

        MangaTrackedBo mangaTracked = retrievedmangas.get(0);
        /*
        // update manga tracked with fresh informations
        mangaTracked.setAuthor(manga.getAuthor());
        mangaTracked.setFinished(manga.isFinished());
        mangaTracked.setImgSrc(manga.getImgSrc());
        mangaTracked.setLastChapterOut(manga.getLastChapterOut()); */

        // update last fetch for current user
        //retrievedUser.get().setLastFetchInformations(LocalDateTime.now());

        return mangaTracked;
    }
}
