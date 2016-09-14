AngularJS-Skeleton
==================

Simplest possible AngularJS skeleton with AngularJS v1.2.6 and jQuery 2.0.2.

WARNING: Before installing application, you have to update node.js. Here the link to latest version: https://nodejs.org/en/.
Install the current version. If you do not install one of the last node's versions, some dipendences can generate errors


## Brunch for development management
After Node installation, execute following commands

	npm install  
	npm install -g brunch

Then execute 'brunch watch --server' to host the application on a virtual server and to benefit of livereload during the development of code. The above command starts the application on address 127.0.0.1:8080/skeletonApp


## Brunch building management
The following commands execute this functions:

For development:
'brunch build': it does not minify, prepares and copies all things in a folder named "public", in dev modality. After this command it needs to execute the 'brunch watch --server' command
Per lo sviluppo:
`brunch build`:  non minifica, prepara e copia tutto in una cartella "public", con la struttura dell’applicazione in modalità sviluppo. Dopo aver eseguito questo comando digitate brunch watch --server per far partire l’applicazione sull’indirizzo 127.0.0.1:8080/gui.
Su index.html ci sono i riferimenti a tutti gli scripts non minificati.

Per la produzione:
`brunch build -p`: è il task utile a creare una cartella "public" di produzione. uglifica, concatena ecc ecc. Digitando brunch wattch --server caricherete sempre l’applicazione all’indirizzo 127.0.0.1:8081, ma con i codici tutti minificati.
