var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var neat = require('node-neat').includePaths;
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

//JavaScript Linting Task
gulp.task('jshint', function () {
    return gulp.src('site/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//Compile Sass task
gulp.task('sass', function () {
    return gulp.src('site/scss/*.scss')
        .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }))
        .pipe(gulp.dest('site/css'));
});

//minify HTML
gulp.task('html', function () {
    return gulp.src('site/index.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('build/'));
});


//JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function () {
    return browserify('site/js/main.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

//styles build task, concatenates all the files
gulp.task('styles', function () {
    return gulp.src('site/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('build/css'));
});

//image optimization task
gulp.task('images', function () {
    return gulp.src('site/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

//watch task
gulp.task('watch', function () {
    gulp.watch('site/js/*.js', ['jshint']);
    gulp.watch('site/scss/*.scss', ['sass']);
});

//Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

//Build Task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images']);
