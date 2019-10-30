DROP TABLE IF EXISTS mangas_tracked CASCADE;
DROP TABLE IF EXISTS mangas CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles_mt CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;

-- TABLE CREATION


create table if not exists users
(
    id         serial not null,
    password   varchar(255),
    username   varchar(255),
    created_at timestamp not null,
    updated_at timestamp not null,
    email      varchar(40),
    created_by INTEGER,
    updated_by INTEGER,
    constraint users_pkey
        primary key (id)
);

alter table users owner to mangatrack_sa;

create table if not exists roles_mt
(
    id   serial not null,
    name varchar(60),
    constraint roles_mt_pkey
        primary key (id),
    constraint unique_name
        unique (name)
);

alter table roles_mt owner to mangatrack_sa;

create table if not exists user_roles
(
    user_id  INTEGER not null,
    role_id INTEGER not null,
    constraint user_roles_pkey
        primary key (user_id, role_id),
    constraint foreign_key_role_id
        foreign key (role_id) references roles_mt,
    constraint foreign_key_user_id
        foreign key (user_id) references users
);

alter table user_roles owner to mangatrack_sa;

create table if not exists mangas
(
    id               serial  not null,
    manga_tracked_id INTEGER not null,
    title            text,
    author           varchar(255),
    img_src          varchar(255),
    is_finished      boolean not null,
    last_chapter_out NUMERIC,
    constraint mangas_pkey
        primary key (id)
);

alter table mangas owner to mangatrack_sa;

create table if not exists mangas_tracked
(
    id                serial  not null,
    last_chapter_read NUMERIC,
    user_id INTEGER NOT NULL,
    manga_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (manga_id) REFERENCES mangas(id),
    constraint mangas_tracked_pkey
        primary key (id)
);

alter table mangas_tracked owner to mangatrack_sa;