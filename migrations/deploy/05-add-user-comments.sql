-- Deploy api-blog:05-add-user-comments to pg

BEGIN;

CREATE TABLE visitor (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE comment (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT,
    visitor_id INT REFERENCES visitor(id),
    post_id INT REFERENCES post(id)
);

COMMIT;
