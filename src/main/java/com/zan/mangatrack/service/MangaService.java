package com.zan.mangatrack.service;

import com.zan.mangatrack.business.MangaBo;
import com.zan.mangatrack.repository.MangaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MangaService {

    @Autowired
    MangaRepository mangaRepository;

    public List<MangaBo> list() {
        return this.mangaRepository.findAll();
    }

    public Optional<MangaBo> get(final long id) {
        return this.mangaRepository.findById(id);
    }
}
