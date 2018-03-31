var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function (cb) {
    pump([
            gulp.src('src/*.js'),
            uglify(),
            gulp.dest('dist'),
            gulp.src('src/*.css'),
            sourcemaps.init(),
            postcss([
                require('autoprefixer'),
                require('postcss-csso')
            ]),
            sourcemaps.write(),
            gulp.dest('dist')
        ],
        cb
    );
});