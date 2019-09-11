package com.zan.mangatrack.business;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "mangas_tracked")
public class MangaTrackedBo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    @Column(columnDefinition = "manga_tracked_id")
    public long mangaTrackedId;

    @Column(columnDefinition = "last_chapter_read")
    public int lastChapterRead;

    private String title;

    private String author;

    private String imgSrc;

    private boolean isFinished;

    private double lastChapterOut;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("mangasTracked")
    private User user;
}
