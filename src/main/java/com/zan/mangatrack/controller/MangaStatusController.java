package com.zan.mangatrack.controller;

import com.zan.mangatrack.dto.MangaStatusDto;
import com.zan.mangatrack.mapper.MangaStatusMapper;
import com.zan.mangatrack.security.HasUserRole;
import com.zan.mangatrack.service.MangaStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mangas-status")
@HasUserRole
public class MangaStatusController {

    @Autowired
    MangaStatusService mangaStatusService;

    @Autowired
    MangaStatusMapper mangaStatusMapper;

    @GetMapping
    ResponseEntity<List<MangaStatusDto>> list() {
        return ResponseEntity.ok(mangaStatusMapper.toDto(mangaStatusService.list()));
    }
}