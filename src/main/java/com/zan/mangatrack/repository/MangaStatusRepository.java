package com.zan.mangatrack.repository;

import com.zan.mangatrack.business.MangaStatusBo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MangaStatusRepository extends JpaRepository<MangaStatusBo, Long> {

    Optional<MangaStatusBo> findFirstByStatus(final String status);
}
