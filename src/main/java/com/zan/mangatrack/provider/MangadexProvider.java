package com.zan.mangatrack.provider;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zan.mangatrack.business.MangaBo;
import com.zan.mangatrack.business.mangadex.MangadexChapter;
import com.zan.mangatrack.business.mangadex.MangadexManga;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class MangadexProvider {

    private static final Logger LOGGER = LoggerFactory.getLogger(MangadexProvider.class);

    @Autowired
    ObjectMapper objectMapper;

    public void createMangaFromJson(List<MangaBo> mangas, long id, String mangadexResponse) {
        if(mangadexResponse != null)  {
            try {
                // get informations nodes
                JsonNode rootNode = objectMapper.readTree(mangadexResponse);
                JsonNode mangaNode = rootNode.get("manga");
                JsonNode chapterNode = rootNode.get("chapter");

                List<MangadexChapter> chapters = new ArrayList<>();

                MangadexManga mangadexManga = new MangadexManga(
                        mangaNode.get("title").asText(),
                        mangaNode.get("cover_url").asText(),
                        mangaNode.get("author").asText(),
                        mangaNode.get("status").asInt()
                );

                if(chapterNode != null) {
                    Iterator<JsonNode> iterator = chapterNode.elements();

                    while (iterator.hasNext()) {
                        JsonNode current = iterator.next();
                        chapters.add(new MangadexChapter(
                                current.get("chapter").asText(),
                                current.get("lang_code").asText(),
                                current.get("timestamp").asLong()
                        ));
                    }
                }

                MangaBo mangaBo = new MangaBo(mangadexManga, chapters, id);
                mangas.add(mangaBo);

                LOGGER.info(mangaBo.getTitle() + " with id " + id + " is fetched.");
            } catch (IOException e) {
                LOGGER.error(e.getMessage());
            }
        }
    }
}
