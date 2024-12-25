module.exports = function override(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        'jsmediatags': 'jsmediatags/dist/jsmediatags.min.js',
    };
    return config;
};
