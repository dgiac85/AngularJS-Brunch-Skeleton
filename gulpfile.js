/*
	gulpfile.js
	E' il file utile a buildare l'applicazione all'interno di una cartella dist
	Il task gulp genera una cartella dist con gli scripts non minificati
	Il task gulp build genera la cartella dist con gli scripts minificati
	Il task gulp serve fa partire un server che mostra i contenuti della cartella dist
	buildata all'indirizzo 127.0.0.1:8081
*/

require('es6-promise').polyfill();
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var ngAnnotate = require('gulp-ng-annotate');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var cssnano= require('gulp-cssnano');
var htmlminify = require('gulp-html-minifier');
var replace = require('gulp-replace');
var htmlreplace = require('gulp-html-replace');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var os = require('os');
var webserver= require('gulp-webserver');
var open = require('gulp-open');
var fs = require('extfs');

var bases = {
		 app: './app/',
		 dist: 'dist/'
};

var paths = {
		 scripts: ['scripts/app.js',
			 				 'scripts/controllers/*.js',
		 					 'scripts/controllers/menu/*.js',
							 'scripts/directives/*.js',
							 'scripts/interceptors/*.js',
							 'scripts/services/*.js'
						 	],
		 htmlRoot:['assets/index.html'],
		 htmlExtFolders:['assets/views/*.html','assets/views/**/*.html'],
		 fonts:['assets/fonts/*.*'],
		 images:['assets/images/*.*','assets/images/**/*.*'],
		 styles:['styles/*.css'],
		 libs:[ 'scripts/libs/*.js',
			 			],
		 dist: ['dist/']
};

//Delete the dist directory
gulp.task('clean', function() {
 return gulp.src(bases.dist)
 .pipe(clean());
});


//Process scripts and concatenate them into one output file
gulp.task('scripts', ['clean'], function() {
	 gulp.src(paths.scripts[0], {cwd: bases.app})
	 .pipe(gulp.dest(bases.dist + 'scripts'));

	 gulp.src(paths.scripts[1], {cwd: bases.app})
	 .pipe(gulp.dest(bases.dist + 'scripts/controllers'));

	 gulp.src(paths.scripts[2], {cwd: bases.app})
	 .pipe(gulp.dest(bases.dist + 'scripts/controllers/menu'));

	 gulp.src(paths.scripts[3], {cwd: bases.app})
	 .pipe(gulp.dest(bases.dist + 'scripts/interceptors'));

	 gulp.src(paths.scripts[4], {cwd: bases.app})
	 .pipe(gulp.dest(bases.dist + 'scripts/services'));
});

//Process scripts and concatenate them into one output file
gulp.task('scriptsBuild', ['clean'], function() {
	 gulp.src(paths.scripts, {cwd: bases.app})
	 .pipe(ngAnnotate())
	 .pipe(uglify())
	 .pipe(concat('app.min.js'))
	 .pipe(gulp.dest(bases.dist + 'scripts/'));
});

//Imagemin images and ouput them in dist
gulp.task('imagemin', ['clean'], function() {
	 gulp.src(paths.images, {cwd: bases.app})
	 .pipe(imagemin())
	 .pipe(gulp.dest(bases.dist + 'images/'));
});

//Copy all other files to dist directly
gulp.task('copy', ['clean'], function() {

	//---------------- Copy html //try to remove dist from path TODO
	 gulp.src(paths.htmlRoot, {cwd: bases.app})
	 .pipe(htmlminify({removeComments: true,collapseWhitespace:true,preserveLineBreaks:true}))
	 .pipe(replace('dist/', ''))
	 .pipe(gulp.dest(bases.dist));

	 //------------- copy fonts
	 gulp.src(paths.fonts, {cwd: bases.app})
	 .pipe(gulp.dest(bases.dist+"fonts/"));

	 //------------- copy images
	 gulp.src(paths.images, {cwd: bases.app})
	 .pipe(gulp.dest(bases.dist+"images/"));

	 gulp.src(paths.htmlExtFolders, {cwd: bases.app+'**'})
	 .pipe(gulp.dest(bases.dist));

});



//Copy all other files to dist directly
gulp.task('copyBuild', ['clean'], function() {

	//---------------- Copy html //try to remove dist from path TODO
	 gulp.src(paths.htmlRoot, {cwd: bases.app})
	 .pipe(htmlminify({removeComments: true,collapseWhitespace:true,preserveLineBreaks:true}))
	 .pipe(replace('dist/', ''))
	 .pipe(gulp.dest(bases.dist));

	 //------------- copy fonts
	 gulp.src(paths.fonts, {cwd: bases.app})
	 .pipe(gulp.dest(bases.dist+"fonts/"));

	 gulp.src(paths.htmlExtFolders, {cwd: bases.app+'**'})
	 .pipe(gulp.dest(bases.dist));

});



gulp.task('libs',['clean'],function(){
	// lib scripts, minified to one
	gulp.src(paths.libs, {cwd: bases.app})
	.pipe(gulp.dest(bases.dist+'/scripts/libs'));
});

gulp.task('libsBuild',['clean'],function(){
	// lib scripts, minified to one
	gulp.src(paths.libs, {cwd: bases.app})
	.pipe(ngAnnotate())
	.pipe(concat('vendor.js'))
	.pipe(uglify())
	.pipe(gulp.dest(bases.dist+'lib'));
});

gulp.task('styles',['clean'],function(){
	// lib scripts, minified to one
	gulp.src(paths.styles, {cwd: bases.app})
	.pipe(gulp.dest(bases.dist+'styles'));
});

gulp.task('stylesBuild',['clean'],function(){
	// lib scripts, minified to one
	gulp.src(paths.styles, {cwd: bases.app})
	.pipe(concat('style.css'))
	.pipe(cssnano())
	.pipe(gulp.dest(bases.dist+'styles'));
});


gulp.task('webserver', function() {
  connect.server({
		host:'127.0.0.1',
		port:8081,
    root: [bases.dist]
  });
});

gulp.task('webserverDev', function() {
  connect.server({
		host:'127.0.0.1',
		port:8081,
    root: [bases.app],
		livereload:true
  });
});

gulp.task('open', function(){
	fs.isEmpty(bases.dist, function (empty) {
	  if(empty){
			console.log("ERROR: folder dist is empty. 'gulp' command is necessary ")
			return;
		}
		else {
			gulp.src(__filename)
			.pipe(open({uri: 'http://127.0.0.1:8081'}));
		}
	});

});

gulp.task('openDev', function(){
	fs.isEmpty(bases.app, function (empty) {
	  if(empty){
			console.log("ERROR: folder dist is empty. 'gulp' command is necessary ")
			return;
		}
		else {
			gulp.src(__filename)
			.pipe(open({uri: 'http://127.0.0.1:8081'}));
		}
	});

});

gulp.task('watch',['openDev'], function() {
  livereload.listen();
  gulp.watch(bases.app+'app/*.*', ['openDev']);
});

gulp.task('replace',['clean'], function() {
  gulp.src(bases.app+'assets/index.html')
    .pipe(htmlreplace({
        'css': 'styles/style.css',
				'jsv': 'lib/vendor.js',
        'js': 'scripts/app.min.js'
    }))
    .pipe(gulp.dest('dist/'));
});


//Define the default task as a sequence of the above tasks
gulp.task('default', ['clean', 'scripts','libs','styles','copy']);
gulp.task('build', ['clean', 'scriptsBuild','libsBuild','stylesBuild','imagemin', 'copyBuild','replace']);
gulp.task('serveDev',['webserverDev','openDev','watch']);
gulp.task('serve',['webserver','open']);
