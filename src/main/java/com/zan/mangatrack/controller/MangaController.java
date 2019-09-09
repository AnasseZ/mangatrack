package com.zan.mangatrack.controller;

import com.zan.mangatrack.business.MangaBo;
import com.zan.mangatrack.security.HasUserRole;
import com.zan.mangatrack.service.MangaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mangas")
@HasUserRole
public class MangaController {

    @Autowired
    MangaService mangaService;

    @GetMapping
    ResponseEntity<List<MangaBo>> list() {
        return ResponseEntity.ok(mangaService.list());
    }

    @GetMapping("/search/{title}")
    ResponseEntity<List<MangaBo>> search(@PathVariable String title) {
        return ResponseEntity.ok(mangaService.search(title));
    }

    @GetMapping("/{id}")
    ResponseEntity<MangaBo> get(@PathVariable long id) {
        return ResponseEntity.ok(mangaService.get(id).get());
    }

    @PostMapping("/mangadex/{min}/{max}")
    ResponseEntity<List<MangaBo>> saveMangadexMangas(@PathVariable long min, @PathVariable long max) {
        return ResponseEntity.ok(mangaService.saveMangadexManga(min, max));
    }
}
