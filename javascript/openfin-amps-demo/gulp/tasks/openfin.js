const gulp = require('gulp');
const src = require('../config').js;

let openfinLauncher = require('openfin-launcher'),
    path = require('path');

gulp.task('openfin', () => {
    openfinLauncher.launchOpenFin({
        // configPath: 'file:/' + path.resolve('app.json')
        configPath: 'C:/Users/Per/Source/Repos/sandbox/javascript/openfin-amps-demo/openfin-config/app.dev.json'
    });
});
