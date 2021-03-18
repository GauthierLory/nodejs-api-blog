-- Deploy api-blog:01-base-schema to pg

BEGIN;

CREATE TABLE category (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    route TEXT NOT NULL
);

CREATE TABLE post (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    category_id INT REFERENCES category(id)
);

COMMIT;
