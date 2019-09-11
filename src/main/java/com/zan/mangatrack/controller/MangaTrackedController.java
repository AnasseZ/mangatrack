package com.zan.mangatrack.controller;

import com.zan.mangatrack.business.MangaTrackedBo;
import com.zan.mangatrack.business.UserPrincipal;
import com.zan.mangatrack.security.CurrentUser;
import com.zan.mangatrack.service.MangaTrackedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api/mangas-tracked")
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

    @PostMapping
    ResponseEntity<MangaTrackedBo> post(@RequestBody MangaTrackedBo mangaTrackedBo, @CurrentUser UserPrincipal currentUser) {
        MangaTrackedBo createdMangaTracked = mangaTrackedService.persist(mangaTrackedBo, currentUser);

        return ResponseEntity
                .created(ServletUriComponentsBuilder
                        .fromCurrentRequest().path("/{id}")
                        .buildAndExpand(createdMangaTracked.getId()).toUri())
                .body(createdMangaTracked);

    }
}
