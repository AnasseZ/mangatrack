package com.zan.mangatrack.controller;

import com.zan.mangatrack.business.MangaTrackedBo;
import com.zan.mangatrack.service.MangaTrackedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mangas-tracked")
public class MangaTrackedController {

    @Autowired
    MangaTrackedService mangaTrackedService;

    @GetMapping
    ResponseEntity<List<MangaTrackedBo>> list() {
        return ResponseEntity.ok(mangaTrackedService.list());
    }

    @GetMapping("/{id}")
    ResponseEntity<MangaTrackedBo> get(@PathVariable long id) {
        return ResponseEntity.ok(mangaTrackedService.get(id).get());
    }
}
