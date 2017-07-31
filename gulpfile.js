var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var webserver = require('gulp-webserver');

/* Concatena los archivos js, convirtiéndolos en script.js el que guardrá en la carpeta dist y será el que linkeo en el html*/
gulp.task('script', function() {
    gulp.src(['node_modules/jquery/dist/jquery.js', 'assets/js/*.js'])
        .pipe(concat('script.js'))
        //carpeta dist
        .pipe(gulp.dest('dist/js/'));
});

/* Concatena y minifica el archivo main.scss, convirtiendolo en style.min.css, el que guardará en la carpeta dist y sera el que linkeo en el html */

gulp.task('style', function() {
    gulp.src(['assets/sass/main.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css/'));
});

/* Configuramos el webserver y crea un servidor web de desarrollo que se ejecuta en el localhost puerto 8000 */

gulp.task('webserver', function() {
    gulp.src('../pinterest/')
        .pipe(webserver({
            fallback: 'index.html',
            livereload: true,
            directoryListing: false,
            open: true
        }));
});


/* task para sass */
gulp.task('watch', function() {
    gulp.watch('assets/sass/*.scss', ['style']);
});



/* task para js */
gulp.task('watchjs', function() {
    gulp.watch('assets/js/*.js', ['script']);
});


/* Le indicamos a gulp cuales son las tareas que deberá ejecutar al correr el comando gulp en la terminal */
gulp.task('default', ['script', 'style', 'webserver', 'watch', 'watchjs']);
