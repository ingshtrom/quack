'use strict';

const settings = require('./settings');

module.exports.bootstrap = bootstrap;

function bootstrap () {
    settings.init();
}