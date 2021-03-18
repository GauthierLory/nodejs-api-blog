# nodejs-api-blog


CREATE ROLE blog WITH LOGIN PASSWORD 'blog';
CREATE DATABASE blog OWNER blog;

sqitch deploy db:pg://blog:blog@localhost:5432/blog