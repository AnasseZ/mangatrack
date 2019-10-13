package com.zan.mangatrack.repository;

import com.zan.mangatrack.business.MangaTrackedBo;
import com.zan.mangatrack.business.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MangaTrackedRepository extends JpaRepository<MangaTrackedBo, Long> {

    List<MangaTrackedBo> findByMangaTrackedIdAndUser(final long mangaTrackedId, final User user);
}
