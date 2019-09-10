package com.zan.mangatrack.business;

import com.zan.mangatrack.business.mangadex.MangadexChapter;
import com.zan.mangatrack.business.mangadex.MangadexManga;
import com.zan.mangatrack.util.AppConstants;
import com.zan.mangatrack.util.ChapterHelper;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

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

    private String author;

    private String imgSrc;

    private boolean isFinished;

    private double lastChapterOut;

    public MangaBo() {

    }

    public MangaBo(MangadexManga mangadexManga, List<MangadexChapter> chapters, long id) {
        this.mangaTrackedId = id;
        this.title = mangadexManga.getTitle();
        this.author = mangadexManga.getAuthor();
        this.imgSrc = AppConstants.MANGADEX_IMG_ROOT + mangadexManga.getImgSrc();

        // 2 so its finished
        if (mangadexManga.getStatus() == 2) {
            this.isFinished = true;

            if (!chapters.isEmpty()) {
                lastChapterOut = ChapterHelper.findLastChapter(chapters);
            }
        } else {
            this.isFinished = false;
        }
    }
}
