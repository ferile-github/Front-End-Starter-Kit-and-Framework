var gulp 		= require('gulp');
var	gutil 		= require('gulp-util');
var	less 		= require('gulp-less');
var	cssmin 		= require('gulp-cssmin');
var	rename 		= require('gulp-rename');
var	concat 		= require('gulp-concat');
var	uglify 		= require('gulp-uglify');
var	stripDebug 	= require('gulp-strip-debug');
var	buffer 		= require('vinyl-buffer');
var	watchify 	= require('watchify');
var	source 		= require('vinyl-source-stream');
var	xtend 		= require('xtend');
var	jscs 		= require('gulp-jscs');
var	jshint 		= require('gulp-jshint');
var	stylish 	= require('jshint-stylish');
var	notify 		= require("gulp-notify");
var	autoprefixer = require('gulp-autoprefixer');
var	combineMq 	= require('gulp-combine-mq');

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
};

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
