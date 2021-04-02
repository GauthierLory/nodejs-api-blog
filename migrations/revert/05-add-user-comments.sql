-- Revert api-blog:05-add-user-comments from pg

BEGIN;

DROP TABLE visitor, comment;

COMMIT;
