package com.zan.mangatrack.repository;

import com.zan.mangatrack.business.MangaBo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MangaRepository extends JpaRepository<MangaBo, Long> {
}
