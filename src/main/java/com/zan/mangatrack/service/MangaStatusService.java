package com.zan.mangatrack.service;

import com.zan.mangatrack.business.MangaStatusBo;
import com.zan.mangatrack.repository.MangaStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MangaStatusService {

    @Autowired
    MangaStatusRepository mangaStatusRepository;

    public List<MangaStatusBo> list() {
        return this.mangaStatusRepository.findAll();
    }

    public Optional<MangaStatusBo> get(final long id) {
        return this.mangaStatusRepository.findById(id);
    }

    public Optional<MangaStatusBo> findByStatus(final String status) {
        return this.mangaStatusRepository.findFirstByStatus(status);
    }
}
