# Explication du problème
## But
Pouvoir "streamer" automatiquement les changements effectués soit en: sass, pug ou directement du serveur express afin d'imiter le comportement natif d'un environnement react.js, vue.js,etc.

## Problème
* Mise en situation1 :

Lancement du serveur
```
node server.js ou gulp nodemon
```
Lancement des task gulp (voir gulpfile.js)

```
gulp
```
Le lancement d'un proxy basé sur notre serveur express(port: 8091) s'effectue correctement mais renvoit une erreur car il ne reconnait pas la variable tableauTest envoyée par notre serveur à notre vue.

* Mise en situation2:
Lancement du serveur
```
node server.js ou gulp nodemon
```
On se connecte manuellement sur le localhost:8091, pas de proxy ici vu qu'on lance pas les task gulp.
Ma variable tableauTest est reconnue par contre je n'ai pas le stream vu que je n'utilise plus gulp.

## QUID?
1. Est-ce que le fait de passer par un proxy l'empeche de voir la variable passée à notre vue?
2. Problème annexe: J'ai essayé de lié la task nodemon avec les autres tâches lancées par défaut dans le fichier gulpgile mais du coup le stream ne fonctionne plus non plus. 
Existe-t-il un setup optimal? Sources internet relativement pas claires sur le sujet.
