package com.zan.mangatrack.business;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "mangas_tracked")
public class MangaTrackedBo {

    @Id
    public long id;

    @Column(columnDefinition = "manga_tracked_id")
    public long mangaTrackedId;

    @Column(columnDefinition = "last_chapter_read")
    public int lastChapterRead;
}
