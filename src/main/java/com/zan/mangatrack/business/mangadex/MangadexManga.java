package com.zan.mangatrack.business.mangadex;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class MangadexManga {

    private String title;

    private String cover_url;

    private String author;

    private String description;

    private List<MangadexChapter> chapter;
}
