package com.zan.mangatrack.controller;

import com.zan.mangatrack.business.MangaBo;
import com.zan.mangatrack.dto.MangaDto;
import com.zan.mangatrack.mapper.MangaMapper;
import com.zan.mangatrack.security.HasUserRole;
import com.zan.mangatrack.service.MangaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/mangas")
@HasUserRole
public class MangaController {

    @Autowired
    MangaService mangaService;

    @Autowired
    MangaMapper mangaMapper;

    @GetMapping
    ResponseEntity<List<MangaBo>> list() {
        return ResponseEntity.ok(mangaService.list());
    }

    @GetMapping("/search/{title}")
    ResponseEntity<Page<MangaDto>> search(@PathVariable String title, @RequestParam(value = "page", defaultValue ="0") int page) {
        return ResponseEntity.ok(mangaService.search(title, page).map(mangaMapper::toDto));
    }

    @GetMapping("/{id}")
    ResponseEntity<MangaBo> get(@PathVariable long id) {
        return ResponseEntity.ok(mangaService.get(id).get());
    }

    @PostMapping("/mangadex/{min}/{max}")
    ResponseEntity<List<MangaBo>> saveMangadexMangas(@PathVariable long min, @PathVariable long max) throws IOException {
        return ResponseEntity.ok(mangaService.saveMangadexManga(min, max));
    }

    @GetMapping("/{id}/updated-informations")
    ResponseEntity<MangaBo> getUpdatedInformations(@PathVariable long id) throws IOException {
        return ResponseEntity.ok(mangaService.getUpdatedInformations(id));
    }

}
