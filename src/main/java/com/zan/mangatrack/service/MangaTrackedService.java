package com.zan.mangatrack.service;

import com.zan.mangatrack.business.*;
import com.zan.mangatrack.dto.MangaTrackedDto;
import com.zan.mangatrack.mapper.MangaTrackedMapper;
import com.zan.mangatrack.repository.MangaTrackedRepository;
import com.zan.mangatrack.repository.UserRepository;
import com.zan.mangatrack.util.Maths;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MangaTrackedService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MangaService.class);

    @Autowired
    MangaTrackedRepository mangaTrackedRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MangaService mangaService;

    @Autowired
    MangaStatusService mangaStatusService;

    @Autowired
    MangaTrackedMapper mangaTrackedMapper;

    private final int firstPosition = 65535;

    public List<MangaTrackedBo> list(final long userId) throws Exception {

        User retrievedUser = getUserFromUserPrincipal(userId);


        return this.mangaTrackedRepository.findByUser(retrievedUser);
    }

    public MangaTrackedBo get(final long id, final UserPrincipal currentUser) throws Exception {
        MangaTrackedBo retrievedManga = this.mangaTrackedRepository.findById(id).orElseThrow(() -> new Exception("Tracked Manga not found."));

        // check if has right to update manga
        if (retrievedManga.getUser().getId() != currentUser.getId()) {
            throw new Exception("Not authorized. Can't get manga.");
        }

        return retrievedManga;
    }

    public MangaTrackedBo create(final MangaTrackedBo mangaTrackedBo, final UserPrincipal currentUser) throws Exception {
        Optional<User> retrievedUser = userRepository.findById(currentUser.getId());

        // check if manga exist
        MangaBo retrievedManga = mangaService
                .get(mangaTrackedBo.getManga().getId())
                .orElseThrow(() -> new Exception("Manga does not exist."));

        // check if status exist
        MangaStatusBo retrievedStatus = mangaStatusService
                .get(mangaTrackedBo.getMangaStatus().getId())
                .orElseThrow(() -> new Exception("Status does not exist."));

        // check if manga already tracked
        List<MangaTrackedBo> followedMangasWithMangaId =
                mangaTrackedRepository.findByMangaAndUser(retrievedManga, retrievedUser.get());

        if (!followedMangasWithMangaId.isEmpty()) {
            throw new Exception("Manga " + retrievedManga.getTitle() + " already tracked.");
        }

        mangaTrackedBo.setManga(retrievedManga);
        mangaTrackedBo.setUser(retrievedUser.get());
        mangaTrackedBo.setMangaStatus(retrievedStatus);
        mangaTrackedBo.setPosition(generatePosition(retrievedUser.get(), retrievedStatus));

        return this.mangaTrackedRepository.save(mangaTrackedBo);
    }

    /**
     * update a tracked manga
     * if status is present then its an update cause by a dragged action
     *
     * @param id
     * @param updatedMangatracked
     * @param currentUser
     * @param isDragged           if dragged in board
     * @return
     * @throws Exception
     */
    public MangaTrackedBo update(
            final long id,
            final MangaTrackedDto updatedMangatracked,
            final boolean isDragged,
            final UserPrincipal currentUser) throws Exception {

        User retrievedUser = getUserFromUserPrincipal(currentUser.getId());

        // check if tracked manga exists
        MangaTrackedBo retrievedMangaTracked = mangaTrackedRepository
                .findById(id)
                .orElseThrow(() -> new Exception("MangaTracked with this id doesn't exists"));

        if (retrievedMangaTracked.getUser() != retrievedUser) {
            throw new Exception("Not authorized. Can't update manga.");
        }

        // check if destination status exist
        MangaStatusBo updatedStatus = mangaStatusService
                .get(updatedMangatracked.getMangaStatus().getId())
                .orElseThrow(() -> new Exception("Status does not exist."));


        // find mangas tracked from db with same updated status
        List<MangaTrackedBo> mangaTrackedListDestination = mangaTrackedRepository
                .findByMangaStatusAndUserOrderByPositionAsc(updatedStatus, retrievedUser);

        // we have to update status and position
        if (isDragged) {
            updateWhenDragged(updatedMangatracked, retrievedUser, retrievedMangaTracked, updatedStatus, mangaTrackedListDestination);
        } else {
            // status has changed so update position
            if (retrievedMangaTracked.getMangaStatus() != updatedStatus) {
                updateWithLastPositionInCategory(retrievedMangaTracked, mangaTrackedListDestination);
            }
        }

        retrievedMangaTracked.setMangaStatus(updatedStatus);
        retrievedMangaTracked.setLastChapterRead(updatedMangatracked.lastChapterRead);

        return retrievedMangaTracked;
    }

    private void updateWithLastPositionInCategory(MangaTrackedBo retrievedMangaTracked, List<MangaTrackedBo> mangaTrackedList) {
        // get max position in new status and update position with max + 1
        retrievedMangaTracked.setPosition(getLastPosition(mangaTrackedList) + 1);
    }

    private void updateWhenDragged(MangaTrackedDto updatedMangatracked, User retrievedUser, MangaTrackedBo retrievedMangaTracked, MangaStatusBo updatedStatus, List<MangaTrackedBo> mangaTrackedListDestination) {
        // find mangas tracked from db with same source status
        List<MangaTrackedBo> mangaTrackedListSource = mangaTrackedRepository
                .findByMangaStatusAndUserOrderByPositionAsc(retrievedMangaTracked.getMangaStatus(), retrievedUser);


        int oldPosition = retrievedMangaTracked.getPosition();
        int newPosition = updatedMangatracked.getPosition();

        // delete item at old pos anyway
        mangaTrackedListSource.remove(oldPosition);

        // if changing position in same category
        if (retrievedMangaTracked.getMangaStatus() == updatedStatus) {

            // insert at new pos in same category
            mangaTrackedListSource.add(newPosition, mangaTrackedMapper.toBo(updatedMangatracked));

        } else {
            // insert at new pos in differente category
            mangaTrackedListDestination.add(newPosition, mangaTrackedMapper.toBo(updatedMangatracked));

            // reset all indexes in destination
            persistListWithNewPositions(mangaTrackedListDestination);
        }

        // reset all indexes in source
        persistListWithNewPositions(mangaTrackedListSource);

        retrievedMangaTracked.setPosition(newPosition);
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

    /**
     * Method return a position at the end of the category
     *
     * @param user          current user
     * @param mangaStatusBo status of the category
     * @return integer
     */
    public int generatePosition(User user, MangaStatusBo mangaStatusBo) {

        List<MangaTrackedBo> mangasTrackedRetrievied = mangaTrackedRepository
                .findByMangaStatusAndUserOrderByPositionAsc(mangaStatusBo, user);

        if (mangasTrackedRetrievied.isEmpty()) {
            return firstPosition;
        }

        // get last element
        final int currentMaxPosition = getLastPosition(mangasTrackedRetrievied);

        // generate a random int
        return calculateNextRandomPosition(currentMaxPosition);
    }

    public int getLastPosition(List<MangaTrackedBo> mangasTracked) {

        if (mangasTracked.isEmpty()) {
            return 0;
        }

        return mangasTracked.get(mangasTracked.size() - 1).getPosition();
    }

    public int calculateNextRandomPosition(int currentMaxPosition) {
        return Maths.getRandomNumberInRange(currentMaxPosition + firstPosition, currentMaxPosition + (2 * firstPosition));
    }

    public User getUserFromUserPrincipal(Long id) throws Exception {
        return userRepository
                .findById(id)
                .orElseThrow(() -> new Exception("User doesn't exists."));
    }

    private void persistListWithNewPositions(List<MangaTrackedBo> mangaTrackedListDestination) {
        for (int i = 0; i < mangaTrackedListDestination.size(); i++) {
            mangaTrackedListDestination.get(i).setPosition(i);
        }

        mangaTrackedRepository.saveAll(mangaTrackedListDestination);
    }
}
