DROP TABLE IF EXISTS mangas;
DROP TABLE IF EXISTS mangas_tracked;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles_mt;
DROP TABLE IF EXISTS user_roles;


create table if not exists mangas
(
    id               serial  not null,
    manga_tracked_id numeric not null,
    title            text,
    author           varchar(255),
    img_src          varchar(255),
    is_finished      boolean not null,
    last_chapter_out numeric,
    constraint mangas_pkey
        primary key (id)
);

alter table mangas
    owner to mangatrack_sa;

create table if not exists mangas_tracked
(
    id                serial  not null,
    manga_tracked_id  numeric not null,
    last_chapter_read numeric,
    user_id NUMERIC NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    constraint mangas_tracked_pkey
        primary key (id)
);

alter table mangas_tracked
    owner to mangatrack_sa;

create table if not exists users
(
    id         bigserial not null,
    password   varchar(255),
    username   varchar(255),
    created_at timestamp not null,
    updated_at timestamp not null,
    email      varchar(40),
    created_by bigint,
    updated_by bigint,
    constraint users_pkey
        primary key (id)
);

alter table users
    owner to mangatrack_sa;

create table if not exists roles_mt
(
    id   bigserial not null,
    name varchar(60),
    constraint roles_mt_pkey
        primary key (id),
    constraint uk_6q0d0m7s3t4likt4vjpussna4
        unique (name)
);

alter table roles_mt
    owner to mangatrack_sa;

create table if not exists user_roles
(
    user_id bigint not null,
    role_id bigint not null,
    constraint user_roles_pkey
        primary key (user_id, role_id),
    constraint fkm2yc574hrymrpfsyr5scm2vko
        foreign key (role_id) references roles_mt,
    constraint fkhfh9dx7w3ubf1co1vdev94g3f
        foreign key (user_id) references users
);

alter table user_roles
    owner to mangatrack_sa;
