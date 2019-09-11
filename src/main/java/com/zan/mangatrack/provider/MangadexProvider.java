package com.zan.mangatrack.provider;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zan.mangatrack.business.MangaBo;
import com.zan.mangatrack.business.mangadex.MangadexChapter;
import com.zan.mangatrack.business.mangadex.MangadexManga;
import com.zan.mangatrack.util.ChapterHelper;
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

    public MangaBo createMangaFromJson(long id, String mangadexResponse, final boolean firstFetch) throws IOException {
        // get informations nodes
        JsonNode rootNode = objectMapper.readTree(mangadexResponse);
        JsonNode mangaNode = rootNode.get("manga");

        MangadexManga mangadexManga = new MangadexManga(
                mangaNode.get("title").asText(),
                mangaNode.get("cover_url").asText(),
                mangaNode.get("author").asText(),
                mangaNode.get("status").asInt()
        );

        List<MangadexChapter> chapters = getMangadexChapters(rootNode);

        MangaBo mangaBo = new MangaBo(mangadexManga, chapters, id, firstFetch);
        LOGGER.info(mangaBo.getTitle() + " with id " + id + " is fetched.");

        return mangaBo;
    }

    public double getLastChapterOut(String mangadexResponse) throws IOException {
        // get informations nodes
        JsonNode rootNode = objectMapper.readTree(mangadexResponse);

        List<MangadexChapter> chapters = getMangadexChapters(rootNode);

        if(chapters.isEmpty()) {
            return 0;
        }

        return ChapterHelper.findLastChapter(chapters);
    }


    public List<MangadexChapter> getMangadexChapters(JsonNode rootNode) {
        List<MangadexChapter> chapters = new ArrayList<>();
        JsonNode chapterNode = rootNode.get("chapter");

        if (chapterNode != null) {
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
        return chapters;
    }
}
