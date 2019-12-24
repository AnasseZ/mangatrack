package com.zan.mangatrack.repository;

import com.zan.mangatrack.business.MangaStatusBo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MangaStatusRepository extends JpaRepository<MangaStatusBo, Long> {

}
