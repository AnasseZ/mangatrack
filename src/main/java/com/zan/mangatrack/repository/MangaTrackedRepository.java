package com.zan.mangatrack.repository;

import com.zan.mangatrack.business.MangaTrackedBo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MangaTrackedRepository extends JpaRepository<MangaTrackedBo, Long> {
}
