const mongojs = require('hapi-mongojs');
const Boom = require('boom');
const bcrypt = require('bcryptjs');
const request1c = require('request');
const base64 = require('base-64');
const config = require('../../config');

module.exports.post = {
    handler: function (request, reply) {
        const token = request.payload.token;

        var  params = { secret: "6LckICAUAAAAAN6XaJFGLPLG62W9lco6sYiAO27z", response: token }

        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');


        const options = {
            url: "https://www.google.com/recaptcha/api/siteverify?"+query,
            method: 'POST'
        };
        request1c(options, (err, response) => {
                if (response.statusCode === 200) {
                    return reply(response.body);
                } else {
                    return reply({}).code(500);
                }
            }
        );


    }
};
