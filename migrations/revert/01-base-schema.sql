-- Revert api-blog:01-base-schema from pg

BEGIN;

DROP TABLE category, post;

COMMIT;
