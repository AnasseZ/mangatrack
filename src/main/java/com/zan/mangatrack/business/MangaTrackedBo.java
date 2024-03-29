package com.zan.mangatrack.business;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "mangas_tracked")
public class MangaTrackedBo extends AuditedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(columnDefinition = "last_chapter_read")
    public double lastChapterRead;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("mangasTracked")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manga_id")
    private MangaBo manga;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id")
    private MangaStatusBo mangaStatus;

    private int position;
}
