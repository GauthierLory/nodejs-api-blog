# nodejs-api-blog

1) Création du user et de la DB
CREATE ROLE blog WITH LOGIN PASSWORD 'blog';
CREATE DATABASE blog OWNER blog;

2) Déploimement de la migration sur sqitch
sqitch deploy db:pg://blog:blog@localhost:5432/blog

3) Import des données
node import/imports.js