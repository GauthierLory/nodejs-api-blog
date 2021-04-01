# NodeJs-api-blog
NodeJs-api-blog est un projet pour découvrir le monde des api en nodejs. Il s'agit principalement d'un projet pour apprendre Node.js, Express.js, PostgreSQL et Joi pour la validation .

## Prérequis
Vous devez avoir installé Node.js et PostgreSQL et Sqitch si vous souhaitez exécuter l'application en local, de plus il vous faudra créer un utilisateur postgre et une base de donnée.

 - CREATE ROLE `user` WITH LOGIN PASSWORD `password`;
 - CREATE DATABASE `database`OWNER `user`;

Node.Js  **v14.15.1**

## Usage

     ~/ git clone https://github.com/GauthierLory/nodejs-api-blog
     ~/ cd ./ nodejs-api-blog
     ## Installation les dépendances
     ~/ npm install
     ## Demande à sqitch de faire les migrations
     ~/ sqitch deploy db:pg://*user*:*password*@localhost:5432/*database*
     ## Petit script pour importer les données json dans postgresql
     ~/ node import/import.js
     ## Lance l'application
     ~/ npm start

La configuration se trouve a `la racine`. Veuillez créer votre propre fichier `.env`. Vous pouvez trouver un exemple de fichier `.env` dans `.env.example`.

 ## Fonctionnalités
 - [x] Créer un post
   - [x] Validation avec JOI
 - [x] Afficher la liste des posts
 - [x] Afficher le post par son id
 - [x] Afficher la liste des posts en fonction de la category
 - [ ] Créer un commentaire sur un post
 - [ ] Afficher les commentaires d'un post
 - [ ] Afficher un commentaire en fonction de son id
 - [x] Afficher la liste des catégories
 - [ ] Créer un utilisateur
 - [ ] Afficher les informations d'un utilisateur
 
## Requêtes
|Method | Routes  | Description |
|--|--|--|
|POST|/posts|Créer un post |
|GET|/posts|Afficher la liste des posts |
|GET|/posts/:id|Afficher le post par son id |
|GET|/posts/category/:id|Afficher la liste des posts en fonction de la category |
|POST|/posts/:id/comments | Créer un commentaire sur un post |
|GET|/posts/:id/comments|Afficher les commentaires d'un post|
|GET|/comments/:id | Afficher un commentaire en fonction de son id |
|GET|/categories|Afficher la liste des catégories |
|POST| /users  | Créer un utilisateur |
|GET| /users/ | Afficher les informations d'un utilisateur |


