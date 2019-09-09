package com.zan.mangatrack.business.mangadex;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class MangadexResponse {

    private MangadexManga manga;
}