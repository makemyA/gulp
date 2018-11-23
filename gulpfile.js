const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');

//Compile files into CSS files
gulp.task('sass',()=>{
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/sass/*.sass'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});
gulp.task('js',()=>{
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
    .pipe(gulp.dest('src/js'))
})
gulp.task('pug',()=>{
    return gulp.src('views/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('src/'))
    .pipe(browserSync.stream());
});
gulp.task('nodemon',(cb)=>{
    let started=false;
    return nodemon({
         script: 'server.js'
       
    }).on('start',()=>{
        if(!started){
            (cb);
            started=true;
        }
    })
})
gulp.task('serve', ['sass','pug'],()=>{
    browserSync.init({
        /* server: './src', */
        proxy: 'http://localhost:8091/todo/'
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/sass/*.sass'], ['sass']);
    gulp.watch('views/*.pug',['pug']);
    gulp.watch('src/*.pug').on('change', browserSync.reload);
});
 gulp.task('default', ['serve'],);