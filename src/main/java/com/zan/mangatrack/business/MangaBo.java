package com.zan.mangatrack.business;

import com.zan.mangatrack.business.mangadex.MangadexManga;
import com.zan.mangatrack.util.AppConstants;
import com.zan.mangatrack.util.ChapterHelper;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "mangas")
public class MangaBo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(columnDefinition = "manga_tracked_id")
    private long mangaTrackedId;

    @Column(columnDefinition = "title")
    private String title;

    private String description;

    private String author;

    private String cover_url;

    public MangaBo() {

    }

    public MangaBo(MangadexManga mangadexManga, long id) {
        this.mangaTrackedId = id;
        this.title = mangadexManga.getTitle();
        this.author = mangadexManga.getAuthor();
        this.cover_url = AppConstants.MANGADEX_IMG_ROOT + mangadexManga.getCover_url();

        if (mangadexManga.getDescription().length() >= 500) {
            this.description = mangadexManga.getDescription().substring(0, 499);
        } else {
            this.description = mangadexManga.getDescription();
        }
    }
}
