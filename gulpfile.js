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
	notify 		= require("gulp-notify"),
	autoprefixer = require('gulp-autoprefixer'),
	combineMq 	= require('gulp-combine-mq');

var paths = {
	less: {
		src: './less/*.less',
		dest: './css',
		imports : './less/**/*.less'
	},
	head: {
		src: ['./js/head/modernizr-2.8.3.js']
	},
	picturefill: {
		src: ['./js/polyfills/picturefill.js']
	},
	scripts: {
		src: ['./js/plugins/*.js', './js/script.js']
	},
	developmentScripts : './scripts',
	productionScripts : './scripts/production'
}

function buildJS(source, filename) {
	gulp.src(source)
	.on("error", notify.onError("Error: <%= error.message %>"))
	.pipe(concat(filename))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(paths.developmentScripts))
	.pipe(stripDebug())
	.pipe(uglify())
	.pipe(gulp.dest(paths.productionScripts));
}


// Build CSS files
gulp.task('less', function () {
	gulp.src(paths.less.src)
	.pipe(less())
	.on("error", notify.onError("Error: <%= error.message %>"))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(combineMq({
		beautify: false
	}))
	.pipe(cssmin().on('error', notify.onError("Error: <%= error.message %>")))
	.pipe(gulp.dest(paths.less.dest));
});

// Build head.js
gulp.task('head', function() {
	buildJS(paths.head.src, 'head.js');
});

// Build picturefill.js
gulp.task('picturefill', function() {
	buildJS(paths.picturefill.src, 'picturefill.js');
});

// Build scripts.js
gulp.task('scripts', function() {
	buildJS(paths.scripts.src, 'scripts.js');
});

// Watch changes in LESS and Javscript
gulp.task('watch', function () {
	gulp.watch(paths.less.imports, 		['less']);
	gulp.watch(paths.head.src, 			['head']);
	gulp.watch(paths.picturefill.src, 	['picturefill']);
	gulp.watch(paths.scripts.src, 		['scripts']);
});


// Build all Front End code, Less and JS
gulp.task('default', ['less', 'scripts', 'head', 'picturefill', 'watch']);