const merge = require('magepack/lib/module/base/node_modules/lodash.merge');
const isArray = require('magepack/lib/module/base/node_modules/lodash.isArray');
const collectDependencies = require('magepack/lib/module/base/node_modules/magepack/lib/dependencies/collect');

const defaultConfig = {
    module: {
        create: true,
        exclude: ['requirejs/require'],
    }
};

module.exports = (config, callback) => {
    console.log(`[${config.module.name}] Processing module...`);

    

    console.log(`[${config.module.name}] Module processing done.`);
};