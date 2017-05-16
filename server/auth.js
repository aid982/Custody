const config = require('./config');

exports.register = function (plugin, options, next) {

    plugin.auth.strategy('jwt', 'jwt', {
        // Implement validation function
        key: config.security.JWT_SECRET,
        validateFunc: (decoded, request, callback) => {
            return callback(null, true);
        },
        verifyOptions: {algorithms: ['HS256']}
    });


    next();
};


exports.register.attributes = {
    name: 'auth'
};