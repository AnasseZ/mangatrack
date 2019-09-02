package com.zan.mangatrack.controller;

import com.zan.mangatrack.business.MangaBo;
import com.zan.mangatrack.service.MangaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mangas")
public class MangaController {

    @Autowired
    MangaService mangaService;

    @GetMapping
    ResponseEntity<List<MangaBo>> list() {
        return ResponseEntity.ok(mangaService.list());
    }

    @GetMapping("/{id}")
    ResponseEntity<MangaBo> get(@PathVariable long id) {
        return ResponseEntity.ok(mangaService.get(id).get());
    }
}
