const accounts = require('./handlers/accounts');
const api_1c = require('./handlers/api_1c');
const capcha = require('./handlers/capcha');


exports.register = (plugin, options, next) => {

    plugin.route([
        {method: 'POST', path: '/accounts/email/{mode?}', config: accounts.generatePasswordOverEmail},
        {method: 'DELETE', path: '/accounts', config: accounts.delete},
        {method: 'PUT', path: '/accounts', config: accounts.update},
        {method: 'PUT', path: '/accounts/admin', config: accounts.updateAdmin},
        {method: 'GET', path: '/accounts', config: accounts.getAllAccounts},
        {method: 'POST', path: '/accounts', config: accounts.post},
        {method: 'POST', path: '/login', config: accounts.login},
        {method: 'POST', path: '/report', config: api_1c.post},
        {method: 'POST', path: '/capcha', config: capcha.post},
        {method: 'GET', path: '/test', config: accounts.test},
    ]);

    next();
};

exports.register.attributes = {
    name: 'api'
};