package com.zan.mangatrack.business.mangadex;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class MangadexChapter {

    private double chapter;

    private String langCode;

    private Date date;

    public MangadexChapter() {
    }

    public MangadexChapter(String chapter, String langCode, long timestamp) {
        this.chapter = !chapter.isEmpty()
                && (chapter.matches("\\d*\\\\.\\d+$")
                || chapter.matches("\\d+$"))
                ? Double.parseDouble(chapter) : 0;
        this.langCode = langCode;
        this.date = new Date(timestamp);
    }
}
