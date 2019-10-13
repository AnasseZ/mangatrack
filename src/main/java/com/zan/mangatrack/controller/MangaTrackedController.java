package com.zan.mangatrack.controller;

import com.zan.mangatrack.business.MangaTrackedBo;
import com.zan.mangatrack.business.UserPrincipal;
import com.zan.mangatrack.security.CurrentUser;
import com.zan.mangatrack.service.MangaTrackedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.Duration;
import java.time.LocalDateTime;
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
    ResponseEntity<MangaTrackedBo> post(
            @RequestBody MangaTrackedBo mangaTrackedBo,
            @CurrentUser UserPrincipal currentUser
    ) throws Exception {
        MangaTrackedBo createdMangaTracked = mangaTrackedService.persist(mangaTrackedBo, currentUser);

        return ResponseEntity
                .created(ServletUriComponentsBuilder
                        .fromCurrentRequest().path("/{id}")
                        .buildAndExpand(createdMangaTracked.getId()).toUri())
                .body(createdMangaTracked);

    }

    @PutMapping("/{id}")
    ResponseEntity<MangaTrackedBo> updateLastChapterRead(
            @PathVariable long id,
            @RequestBody final MangaTrackedBo manga,
            @CurrentUser UserPrincipal currentUser
    ) throws Exception {

        return ResponseEntity.ok(mangaTrackedService.updateLastChapterRead(id, manga.getLastChapterRead(), currentUser));
    }

    @GetMapping("/{id}/updated-informations")
    ResponseEntity<MangaTrackedBo> updateInformations(
            @PathVariable long id,
            @CurrentUser UserPrincipal currentUser
    ) throws Exception {

        long timeSinceLastFetch = Duration.between(currentUser.getLastFetchInformations(), LocalDateTime.now()).toMillis();

        // allow 1 fetch every 15 minutes
        if (timeSinceLastFetch < 90000) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(mangaTrackedService.getUpdatedInformations(id, currentUser));
    }
}
