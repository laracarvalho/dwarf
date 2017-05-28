//////////////////////////////
///////// Gulp File /////////
////////////////////////////

/* 			-- COMMON GULP FUNCTIONS --
	
	gulp.task -- Define tasks Gulp should operate.
	gulp.src -- Direct Gulp to files it should use.
	gulp.dest -- Folder it outputs.
	gulp.watch -- Watch files and folders for changes.
*/


///// MODULES /////

const gulp = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

///// TASKS /////

// Compiling SCSS to CSS

gulp.task('sass', function() {
	gulp.src('src/scss/*.scss')
    	.pipe(sass().on('error', sass.logError))
    	.pipe(cssnano())
    	.pipe(gulp.dest('dist/css'));
});

// Minifying JavaScript

gulp.task('minify', function() {
	gulp.src('src/js/*.js')
		.pipe(minify())
		.pipe(gulp.dest('dist/js'));
});

// Image Minifying and Optimization

gulp.task('imagemin', function() {
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/imgs'))
});

// Browser Sync & Live Reload

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

///// WATCH FILES /////
 
gulp.task('watch', function() {
	gulp.watch('src/scss/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['minify']);
	gulp.watch('src/images/*', ['imagemin']);
});

///// DEFAULT /////

gulp.task('default', ['browserSync'], function() {
	gulp.watch('src/scss/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['minify']);
	gulp.watch('src/images/*', ['imagemin']);
});
