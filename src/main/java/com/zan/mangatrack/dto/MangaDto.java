package com.zan.mangatrack.dto;

import lombok.Data;

@Data
public class MangaDto {

    private long id;

    private long mangaTrackedId;

    private String title;

    private String author;

    private String imgSrc;

    private boolean isFinished;

    private double lastChapterOut;

    private int nbTrackers;
}
