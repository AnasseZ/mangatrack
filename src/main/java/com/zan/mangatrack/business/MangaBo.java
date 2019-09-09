package com.zan.mangatrack.business;

import com.zan.mangatrack.business.mangadex.MangadexManga;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "mangas")
public class MangaBo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    @Column(columnDefinition = "manga_tracked_id")
    public long mangaTrackedId;

    @Column(columnDefinition = "title")
    public String title;

    public MangaBo() {

    }

    public MangaBo(MangadexManga mangadexManga, long id) {
        this.mangaTrackedId = id;
        this.title = mangadexManga.getTitle();

    }
}
