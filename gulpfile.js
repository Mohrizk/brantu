const gulp = require('gulp');
const nodemon = require('gulp-nodemon')
const uglify = require("gulp-uglify");
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css'), autoprefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const fs = require('fs');
//IMAGE
gulp.task('images',function() {
    return gulp.src('public/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/dist/images'))
});
// Concatenate & Minify CSS
gulp.task('stylesheets', function() {
    return gulp.src([

        'public/plugins/bootstrap/css/bootstrap.css',
        'public/plugins/ion.rangeSlider/css/normalize.css',
        'public/plugins/ion.rangeSlider/css/ion.rangeSlider.css',
        'public/plugins/ion.rangeSlider/css/ion.rangeSlider.skinFlat.css',
        'public/plugins/owl-carousel/owl.theme.css',
        'public/plugins/owl-carousel/owl.carousel.css',
        'public/stylesheets/*.css',


    ])
        .pipe(concat('style.css'))
        .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
        .pipe(gulp.dest('public/dist'))
        .pipe(rename('style.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('public/dist'));
});



// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
        'public/plugins/bootstrap/js/bootstrap.min.js',
        'public/plugins/handlebars/*',
        'public/plugins/algolia/*',
        'public/plugins/ion.rangeSlider/js/ion.rangeSlider.min.js',
        'public/plugins/owl-carousel/owl.carousel.min.js',
        'public/plugins/jquery.lazyload.min.js',
        'public/plugins/jquery-bez/jquery.bez.min.js',
        'public/plugins/page.js',
        'public/javascripts/*.js',])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('public/dist'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist'));
});

gulp.task('develop', function () {
    nodemon({ script: 'node ./bin/www'
        , ext: 'js'
        //, ignore: ['ignored.js']
        , tasks: ['scripts'] })
        .on('restart', function () {
            console.log('restarted!')
        })
})

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('/javascripts/*.js', ['scripts', 'stylesheets']);
});


gulp.task('default', [ 'stylesheets','images','scripts','watch']);
gulp.task('css', [ 'stylesheets']);


