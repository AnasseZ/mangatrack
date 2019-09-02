package com.zan.mangatrack.business;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class MangaBo {

    @Id
    public long id;

    public long mangaTrackedId;

    public int lastChapterRead;
}
