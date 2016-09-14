AngularJS-Brunch-Skeleton
==================

Simplest possible AngularJS skeleton with AngularJS v1.2.6 and jQuery 2.0.2.

WARNING: Before installing application, you have to update node.js. Here the link to latest version: https://nodejs.org/en/.
Install the current version. If you do not install one of the last node's versions, some dipendences can generate errors

IMPORTANT: If you want to install some libraries with bower, first of all:

	npm install -g bower

And then:

	bower install

After you have installed a library, copy the js file in the libs folder (the same thing for css)

# Brunch for development management
After Node installation, execute following commands:

	npm install  
	npm install -g brunch


Then execute:
	brunch watch --server

to host the application on a virtual server and to benefit of livereload during the development of code. The above command starts the application on address 127.0.0.1:8080/skeletonApp


# Brunch building management
The following commands execute this functions:

For development:

	brunch build
it does not minify, prepares and copies all things in a folder named "public", in dev modality. After this command it needs to execute the 'brunch watch --server' command. 8080 is the default port.

For production:

	brunch build -p

this task is useful to create a public production folder. It ugliefies, minifies etc etc. Copy this folder in a server folder (e.g. Tomcat webapps folder)

## Using Gulp for development and building management.

To create a dist folder for developemt:

	gulp

To minify and uglify and create a dist folder for production:

	gulp build

To run application:

	gulp serve
