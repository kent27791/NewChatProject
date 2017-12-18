/// <binding AfterBuild='copy-modules' />
"use strict";

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    glob = require("glob"),
	rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    ignore = require('gulp-ignore'),
    del = require('del');

var mPaths = {
    devModules: "../Modules/",
    hostModules: "./Modules/",
    hostWwwrootModules: "./wwwroot/modules/"
};

var modules = loadModules();

var paths = {
    webroot: "./wwwroot/",
    bower: "./bower_components/"
};

gulp.task('clean-module', function () {
    return gulp.src([mPaths.hostModules + '*', mPaths.hostWwwrootModules + '*'], { read: false })
    .pipe(clean());
});

gulp.task('copy-modules', ['clean-module'], function () {
    modules.forEach(function (module) {
        gulp.src([mPaths.devModules + module.fullName + '/Views/**/*.*', mPaths.devModules + module.fullName + '/module.json'], { base: module.fullName })
            .pipe(gulp.dest(mPaths.hostModules + module.fullName));
        gulp.src(mPaths.devModules + module.fullName + '/bin/Debug/netcoreapp2.0/**/*.*')
            .pipe(gulp.dest(mPaths.hostModules + module.fullName + '/bin'));
        gulp.src(mPaths.devModules + module.fullName + '/wwwroot/**/*.*')
            .pipe(gulp.dest(mPaths.hostWwwrootModules + module.name));
    });

    //gulp.src(mPaths.devModules + 'SimplCommerce.Module.SampleData/SampleContent/**/*.*')
    //        .pipe(gulp.dest(mPaths.hostModules + 'SimplCommerce.Module.SampleData/SampleContent'));
});

gulp.task('copy-static', function () {
    modules.forEach(function (module) {
        gulp.src([mPaths.devModules + module.fullName + '/Views/**/*.*', mPaths.devModules + module.fullName + '/module.json'], { base: module.fullName })
            .pipe(gulp.dest(mPaths.hostModules + module.fullName));
        gulp.src(mPaths.devModules + module.fullName + '/wwwroot/**/*.*')
            .pipe(gulp.dest(mPaths.hostWwwrootModules + module.name));
    });

    //gulp.src(mPaths.devModules + 'SimplCommerce.Module.SampleData/SampleContent/**/*.*')
    //        .pipe(gulp.dest(mPaths.hostModules + 'SimplCommerce.Module.SampleData/SampleContent'));
});

function loadModules() {
    var moduleManifestPaths,
        modules = [];

    moduleManifestPaths = glob.sync(mPaths.devModules + 'Chat.Module.*/module.json', {});
    moduleManifestPaths.forEach(function (moduleManifestPath) {
        var moduleManifest = require(moduleManifestPath);
        modules.push(moduleManifest);
    });

    return modules;
}