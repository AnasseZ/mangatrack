package com.zan.mangatrack.dto;

import com.zan.mangatrack.business.User;
import lombok.Data;

@Data
public class MangaTrackedDto {

    public long id;

    public double lastChapterRead;

    private User user;

    private MangaDto manga;

    private MangaStatusDto mangaStatus;
}
