var gulp 		= require('gulp'),
	gutil 		= require('gulp-util'),
	less 		= require('gulp-less'),
	cssmin 		= require('gulp-cssmin'),
	rename 		= require('gulp-rename'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglify'),
	stripDebug 	= require('gulp-strip-debug'),
	buffer 		= require('vinyl-buffer');
	watchify 	= require('watchify'),
	source 		= require('vinyl-source-stream'),
	xtend 		= require('xtend'),
	jscs 		= require('gulp-jscs'),
	jshint 		= require('gulp-jshint'),
	stylish 	= require('jshint-stylish'),
	notify 		= require("gulp-notify");

var paths = {
	less: {
		src: './less/*.less',
		dest: './css',
		imports : './less/**/*.less'
	},
	modernizr: {
		src: ['./js/head/modernizr-2.8.3.js'],
		dest: './scripts'
	},
	picturefill: {
		src: ['./js/polyfills/picturefill.js'],
		dest: './scripts'
	},
	scripts: {
		src: ['./js/plugins/*.js', './js/script.js'],
		dest: './scripts'
	}
}

var isProduction = false;

if(gutil.env.dev === true) {
	isProduction = true;
}

function buildJS(source, output, filename) {
	gulp.src(source)
	.on("error", notify.onError("Error: <%= error.message %>"))
	.pipe(concat(filename))
	.pipe(isProduction ? stripDebug() : gutil.noop())
	.pipe(isProduction ? uglify() : gutil.noop())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(output));
}


// Build CSS files
gulp.task('less', function () {
	gulp.src(paths.less.src)
	.pipe(less())
	.on("error", notify.onError("Error: <%= error.message %>"))
	.pipe(cssmin().on('error', gutil.log))
	.pipe(gulp.dest(paths.less.dest));
});

// Build modernizr.js
gulp.task('modernizr', function() {
	buildJS(paths.modernizr.src, paths.modernizr.dest, 'modernizr.js');
});

// Build picturefill.js
gulp.task('picturefill', function() {
	buildJS(paths.picturefill.src, paths.picturefill.dest, 'picturefill.js');
});

// Build scripts.js
gulp.task('scripts', function() {
	buildJS(paths.scripts.src, paths.scripts.dest, 'scripts.js');
});

// Watch changes in LESS and Javscript
gulp.task('watch', function () {
	gulp.watch(paths.less.imports, 	['less']);
	gulp.watch(paths.modernizr.src, ['modernizr']);
	gulp.watch(paths.picturefill.src, ['picturefill']);
	gulp.watch(paths.scripts.src, ['scripts']);
});


// Build all Front End code, Less and JS
gulp.task('default', ['less', 'scripts', 'modernizr', 'picturefill', 'watch']);

// Javascript Linting
gulp.task('jscs', function () {
	return gulp.src('**/*.js')
		.pipe(jscs());
});

gulp.task('jshint', function () {
	return gulp.src('./app_llx/cartridge/static/default/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});
