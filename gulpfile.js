var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var shell = require('gulp-shell');
var glob = require('glob');
var livereload = require('gulp-livereload');
var jasminePhantomJs = require('gulp-jasmine2-phantomjs');
var babel = require('babelify');
concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    postcss = require('gulp-pleeease'),
    header = require('gulp-header'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify');


var dev = true;
// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
    'react/addons'
];

var browserifyTask = function (options) {

  // Our app bundler
	var appBundler = browserify({
		entries: [options.src], // Only need initial file, browserify finds the rest
   	transform: [babel, reactify], // We want to convert JSX to normal javascript
		debug: options.development, // Gives us sourcemapping
		cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
	});

	// We set our dependencies as externals on our app bundler when developing		
	(options.development ? dependencies : []).forEach(function (dep) {
		appBundler.external(dep);
	});

  // The rebundle process
  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');
    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('main.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, livereload()))
      .pipe(notify({
            title: "APP bundled",
            message: 'APP bundle built in ' + (Date.now() - start) + 'ms',
            onLast: true
        }));
  };

  // Fire up Watchify when developing
  if (options.development) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);
  }
      
  rebundle();

  // We create a separate bundle for our dependencies as they
  // should not rebundle on file changes. This only happens when
  // we develop. When deploying the dependencies will be included 
  // in the application bundle
  if (options.development) {

  	var testFiles = glob.sync('./specs/**/*-spec.js');
		var testBundler = browserify({
			entries: testFiles,
			debug: true, // Gives us sourcemapping
			transform: [reactify],
			cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
		});

		dependencies.forEach(function (dep) {
			testBundler.external(dep);
		});

  	var rebundleTests = function () {
        return;
  		var start = Date.now();
  		console.log('Building TEST bundle');
  		testBundler.bundle()
      .on('error', gutil.log)
	      .pipe(source('specs.js'))
	      .pipe(gulp.dest(options.dest))
	      .pipe(livereload())
	      .pipe(notify(function () {
	        console.log('TEST bundle built in ' + (Date.now() - start) + 'ms');
	      }));
  	};

    testBundler = watchify(testBundler);
    testBundler.on('update', rebundleTests);
    rebundleTests();

    // Remove react-addons when deploying, as it is only for
    // testing
    if (!options.development) {
      dependencies.splice(dependencies.indexOf('react/addons'), 1);
    }

    var vendorsBundler = browserify({
      debug: true,
      require: dependencies
    });
    
    // Run the vendor bundle
    var start = new Date();
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
      }));
    
  }
  
}

var cssTask = function (options) {
    if (options.development) {
      var run = function () {
        console.log(arguments);
        var start = new Date();
        console.log('Building CSS bundle');
        gulp.src(options.src)
          .pipe(concat('main.css'))
          .pipe(gulp.dest(options.dest))
          .pipe(notify(function () {
            console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
          }));
      };
      run();
      gulp.watch(options.src, run);
    } else {
      gulp.src(options.src)
        .pipe(concat('main.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(options.dest));   
    }
}

var sassTask = function (options) {
        var run = function () {
            gulp.src(options.src).pipe(plumber()).pipe(options.development?sourcemaps.init():gutil.noop()).pipe(sass({
                sourceComments: 'none',
                imagePath: '../img',
                outputStyle: 'nested'
            })).pipe(postcss({
                'sourcemaps': options.development,
                'autoprefixer': true,
                'filters': true,
                'rem': true,
                'pseudoElements': true,
                'opacity': true,
                'import': true,
                'calc': true,
                'mqpacker': !options.development,
                'minifier': !options.development,
                'next': false
            })).pipe(options.development?sourcemaps.write(options.dest):gutil.noop()).pipe(gulp.dest(options.dest)).pipe(notify({
                title: "SASS done",
                message: "Sass is done",
                onLast: true
            })).pipe(gulpif(options.development, livereload()))

        }
        run();
    if(options.development) {
        gulp.watch(options.watch, run);

    }
}

var copyAssetsTask = function (options) {
    gulp.src('./app/fonts/**/*.{ttf,woff,eot,eof,svg}')
        .pipe(gulp.dest(options.dest+'/fonts'));
    gulp.src('./app/images/**/*.{jpg,png,gif,jpeg}')
        .pipe(gulp.dest(options.dest+'/images'));
};
// Starts our development workflow
gulp.task('default', function () {
    copyAssetsTask(
        {
            dest:'./build'
        }

    );
    browserifyTask({
        development: true,
        src: './app/main.js',
        dest: './build'
    });

    sassTask({
        development: true,
        src: './styles/main.scss',
        watch: './styles/**/*.scss',
        dest: './build'
    });


});

gulp.task('deploy', function () {
    copyAssetsTask(
        {
            dest:'./dist'
        }

    );

    browserifyTask({
    development: false,
    src: './app/main.js',
    dest: './dist'
    });

    sassTask({
        development: false,
        src: './styles/main.scss',
        watch: './styles/**/*.scss',
        dest: './dist'
    });


});

gulp.task('test', function () {
    return gulp.src('./build/testrunner-phantomjs.html').pipe(jasminePhantomJs());
});
