const mongojs = require('hapi-mongojs');
const Boom = require('boom');
const bcrypt = require('bcryptjs');
const request1c = require('request');
const base64 = require('base-64');
const config = require('../../config');

module.exports.post = {
    auth:'jwt',
    handler: function (request, reply) {

        let creds = request.auth.credentials;
        request.log('request', 'report '+creds.email);

        //Check if user have the right to view account
        if(!((creds.roles.indexOf('ADMIN')>=0)||(creds.accounts.indexOf(request.payload.account)>=0))) {
            return reply({}).code(403);
        }

        const options = {
            url: config.api_1c.hostname + '?account=' + request.payload.account + '&date1=' + request.payload.date1 + '&date2=' + request.payload.date2,
            headers: {
                'Authorization': "Basic " + base64.encode(config.api_1c.user + ":" + config.api_1c.password)
            },
            method: 'GET'
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
