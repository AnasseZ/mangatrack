package com.zan.mangatrack.controller;

import com.zan.mangatrack.business.MangaTrackedBo;
import com.zan.mangatrack.business.UserPrincipal;
import com.zan.mangatrack.dto.MangaTrackedDto;
import com.zan.mangatrack.mapper.MangaTrackedMapper;
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

    @Autowired
    MangaTrackedMapper mangaTrackedMapper;

    @GetMapping
    ResponseEntity<List<MangaTrackedDto>> list(
            @CurrentUser UserPrincipal currentUser
    ) throws Exception {
        return ResponseEntity.ok(
                mangaTrackedMapper.toDto(mangaTrackedService.list(currentUser.getId()))
        );
    }

    @GetMapping("/{id}")
    ResponseEntity<MangaTrackedDto> get(@PathVariable long id) throws Exception {
        return ResponseEntity.ok(mangaTrackedMapper.toDto(mangaTrackedService.get(id)));
    }

    @PostMapping
    ResponseEntity<MangaTrackedDto> post(
            @RequestBody MangaTrackedBo mangaTrackedBo,
            @CurrentUser UserPrincipal currentUser
    ) throws Exception {
        MangaTrackedDto createdMangaTracked = mangaTrackedMapper
                .toDto(mangaTrackedService.persist(mangaTrackedBo, currentUser));

        return ResponseEntity
                .created(ServletUriComponentsBuilder
                        .fromCurrentRequest().path("/{id}")
                        .buildAndExpand(createdMangaTracked.getId()).toUri())
                .body(createdMangaTracked);

    }

    @PutMapping("/{id}")
    ResponseEntity<MangaTrackedDto> updateLastChapterRead(
            @PathVariable long id,
            @RequestBody final MangaTrackedDto manga,
            @CurrentUser UserPrincipal currentUser
    ) throws Exception {

        return ResponseEntity.ok(
                mangaTrackedMapper.toDto(
                        mangaTrackedService.updateLastChapterRead(id, manga.getLastChapterRead(), currentUser)
                ));
    }


    /*

    @GetMapping("/{id}/updated-informations")
    ResponseEntity<MangaTrackedBo> updateInformations(
            @PathVariable long id,
            @CurrentUser UserPrincipal currentUser
    ) throws Exception {

        /*
        long timeSinceLastFetch = Duration.between(currentUser.getLastFetchInformations(), LocalDateTime.now()).toMillis();

        // allow 1 fetch every 15 minutes
        if (timeSinceLastFetch < 90000) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(mangaTrackedService.getUpdatedInformations(id, currentUser));
    } */
}
