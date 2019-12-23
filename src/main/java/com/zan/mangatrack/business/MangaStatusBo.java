package com.zan.mangatrack.business;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "mangas_status")
public class MangaStatusBo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String status;
}
