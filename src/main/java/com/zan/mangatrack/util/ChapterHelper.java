package com.zan.mangatrack.util;

import com.zan.mangatrack.business.mangadex.MangadexChapter;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

public final class ChapterHelper {

    public static double findLastChapter(List<MangadexChapter> chapters) {
        Optional <MangadexChapter> chapter = chapters.stream()
                .max(Comparator.comparing(MangadexChapter::getChapter));

        if(chapter.isPresent()) {
            return chapter.get().getChapter();
        }

        return 0;
    }
}
