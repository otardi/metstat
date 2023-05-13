# Que suis-je?

Une application "fullstack" utilisant *express.js* et *React* pour afficher des données sur les incidents dans le métro de Montréal de 2019 à 2021.

# Pourquoi?

Pour servir de démo ou de base à des exercices dans des cours de backend, frontend ou BD.

# Comment ça marche?

Le répertoire `backend` est un serveur *ExpressJS* qui se connecte sur une BD *MariaDB* locale. 

Le répertoire `frontend` est une application *React* qui se connecte sur l'API du serveur *ExpressJS*. 

Les données sont publiques et viennent d'[ici](https://www.donneesquebec.ca/recherche/dataset/vmtl-incidents-du-reseau-du-metro). Elles ont été transformées pour être utilisées dans *MariaBD*.


## backend
+ npm
    + mysql2 

## frontend
+ npm
    + bootstrap
    + react-google-charts
    + react-datepicker