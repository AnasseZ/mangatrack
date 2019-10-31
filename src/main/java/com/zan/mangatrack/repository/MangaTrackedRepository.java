package com.zan.mangatrack.repository;

import com.zan.mangatrack.business.MangaBo;
import com.zan.mangatrack.business.MangaTrackedBo;
import com.zan.mangatrack.business.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MangaTrackedRepository extends JpaRepository<MangaTrackedBo, Long> {

    List<MangaTrackedBo> findByMangaAndUser(final MangaBo manga, final User user);

    List<MangaTrackedBo> findByIdAndUser(final long id, final User user);

    List<MangaTrackedBo> findByUser(final User user);

    @Query("SELECT DISTINCT m.manga FROM MangaTrackedBo m")
    List<MangaBo> findDistinctManga();
}
