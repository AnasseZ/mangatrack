package com.zan.mangatrack.business.mangadex;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class MangadexManga {

    private String title;

    private String imgSrc;

    private String author;

    private int status;

    public MangadexManga() {

    }

    public MangadexManga(String title, String imgSrc, String author, int status) {
        this.title = title;
        this.imgSrc = imgSrc;
        this.author = author;
        this.status = status;
    }
}
