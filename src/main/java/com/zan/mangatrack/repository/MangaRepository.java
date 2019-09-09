package com.zan.mangatrack.repository;

import com.zan.mangatrack.business.MangaBo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MangaRepository extends JpaRepository<MangaBo, Long> {

    @Query("SELECT m FROM MangaBo m WHERE lower(m.title) LIKE %:title% ")
    List<MangaBo> findByKeywords(final String title);
}
