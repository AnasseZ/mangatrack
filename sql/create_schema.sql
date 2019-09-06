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


CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
)