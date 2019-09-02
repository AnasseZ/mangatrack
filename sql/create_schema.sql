DROP TABLE IF EXISTS mangas;
DROP TABLE IF EXISTS mangas_tracked;


CREATE TABLE mangas (
    id SERIAL NOT NULL PRIMARY KEY,
    manga_tracked_id NUMERIC NOT NULL,
    title TEXT
);

CREATE TABLE mangas_tracked (
    id SERIAL NOT NULL PRIMARY KEY,
    manga_tracked_id NUMERIC NOT NULL,
    last_chapter_read NUMERIC
);