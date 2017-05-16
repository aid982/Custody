const fs = require('fs');
const envKey = key => {
    const env = process.env.NODE_ENV || 'development';

    const configuration = {
        development: {
            host: 'statement.dragon-capital.com',
            port: 4000
        },
        uat: {
            host: 'localhost',
            port: 8010
        },
// These should match environment variables on hosted server
        production: {
            host: process.env.HOST,
            port: process.env.PORT
        }
    };

    return configuration[env][key];
};

const manifest = {
    connections: [
        {
            host: envKey('host'),
            port: envKey('port'),
            routes: {
                cors: true
            },
            router: {
                stripTrailingSlash: true
            },
            /*tls:{
                key : fs.readFileSync('./cert/wildcard_dragon-capital_com.key'),
               cert : fs.readFileSync('./cert/dragon.crt')
            }*/
        }
    ],
    registrations: [
        {
            plugin: 'hapi-auth-jwt2'
        },
        {
            plugin: './auth'
        },
        {
            plugin: './api',
            options: {routes: {prefix: '/api'}}
        },
        {
            plugin: {
                register: 'hapi-mongojs',
                options: {
                    url: 'mongodb://localhost:27017/custody',
                    collections: [
                        {
                            name: 'accounts'
                        }
                    ]
                }
            }
        },
        {
            plugin: {
                register: 'hapi-cors',
                options: {
                    origins: ['https://statement.dragon-capital.com'],
                    //origins: ['http://192.168.24.2:3007'],
                    headers: ["Accept", "Content-Type", "Authorization"],
                    methods: ["POST,GET,OPTIONS,PUT"]
                }
            }
        },
        {
            plugin: {
                register: 'good',
                options: {
                    ops: {interval: 60000},
                    reporters: {
                        console: [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{ log: '*', response: '*',request: { include: ['*'] }  }]
                            }, {module: 'good-console'}, 'stdout'
                        ],
                        myFileReporter: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ error: '*',response: '*', request:'*'}]
                        }, {
                            module: 'good-squeeze',
                            name: 'SafeJson'
                        }, {
                            module: 'good-file',
                            args: ['./test/fixtures/awesome_log.json']
                        }],
                        myHTTPReporter: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ error: '*',response: '*', request:'*'}]
                        }]
                    }
                }
            }
        }
    ]
};

module.exports = manifest;