package com.zan.mangatrack.business;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class MangaBo {

    @Id
    public long id;

    public long mangaTrackedId;

    public int lastChapterRead;
}
