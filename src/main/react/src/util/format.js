export const getTitle = title => getReducedText(title, 15);

export const getDescription = description => getReducedText(description, 250);

export const getReducedText = (text, length) => text.length > length
    ? text.substring(0, length) + "..."
    : text;


export const createMangaTrackedFromManga = (manga, lastChapterRead, status) => {
    return {
        lastChapterRead: lastChapterRead,
        manga: {
            id: manga.id,
            author: manga.author,
            mangaTrackedId: manga.mangaTrackedId,
            title: manga.title,
            imgSrc: manga.imgSrc,
            isFinished: manga.isFinished,
            lastChapterOut: manga.lastChapterOut,
        },
        mangaStatus: status
    };
};