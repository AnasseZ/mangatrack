package com.zan.mangatrack.util;

import com.zan.mangatrack.business.mangadex.MangadexChapter;

import java.util.List;

public final class ChapterHelper {

    public static int findLastChapter(List<MangadexChapter> chapters) {
        return Integer.parseInt(chapters.get(0).getChapter());
    }

}
