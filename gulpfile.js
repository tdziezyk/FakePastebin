var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('default', function(){
	gulp.src('app/js/**/*.js')
	.pipe(concat('all.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/dist'));
});

gulp.task('sass', function(){
	gulp.src('app/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('app/css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('app/sass/**/*.scss', [ 'sass' ]);
});
