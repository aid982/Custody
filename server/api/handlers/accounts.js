const mongojs = require('hapi-mongojs');
const Boom = require('boom');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const config = require('../../config');
const nodemailer = require('nodemailer');
const passwordGenerator = require('generate-password');

var mailTransporter = nodemailer.createTransport(
    config.mailTransporter
);


module.exports.login = {
    handler: function (request, reply) {
        const account = request.payload;
        const accountsCollection = mongojs.db().collection('accounts');
        accountsCollection.findOne({$or: [{'name': account.login}, {'email': account.login}]}, (err, result) => {
            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }
            if (result) {
                try {
                    if (((result.name === account.login) || (result.email === account.login)) && (bcrypt.compareSync(account.password, result.password))) {
                        let tmp = {
                            name: result.name,
                            email: result.email,
                            accounts: result.accounts,
                            roles: result.roles
                        };

                        let token = JWT.sign(tmp, config.security.JWT_SECRET, {expiresIn: config.security.TOKEN_EXP}); // synchronous
                        tmp.token = token;
                        let resultReply = {
                            account: tmp
                        }
                        return reply(resultReply).code(200);
                    } else { /// save qty of login attempts
                        return reply({errorMSG: 'wrong login or password'}).code(401);
                    }
                } catch (err) {
                    return reply({errorMSG: 'wrong login or password'}).code(500);
                }
            } else {
                return reply({errorMSG: 'wrong login or password'}).code(401);

            }
        });
    }

};

module.exports.logOut = {
    handler: function (request, reply) {
        if (request.session) {
            request.session.currentUser = null;
        }
        reply(request.auth.credentials).code(200);
    }

};
module.exports.getAllAccounts = {
    auth: 'jwt',
    handler: function (request, reply) {
        "use strict";
        if (request.auth.credentials.roles.indexOf('ADMIN') >= 0) {
            const accountsCollection = mongojs.db().collection('accounts');
            // return all account except password
            accountsCollection.find({}, {name: 1, email: 1, roles: 1, accounts: 1}, (err, result) => {
                    if (err) {
                        return reply(Boom.wrap(err, 'Internal MongoDB error'));
                    }
                    if (result) {
                        return reply(result).code(200);
                    }
                }
            )

        } else {
            return reply().code(403);


        }
    }

}
// update account (change password)
// required fields
// if user is Admin password_old not required
// request body { name ,password_old,password}

const updateAccount = (account, accountsCollection, reply) => {
    try {
        var hashedPassword;
        if (account.password) {
             hashedPassword = bcrypt.hashSync(account.password);
        }
        let tmp;
        //if user is Admin we can change everything

            tmp = {
                name: account.login,
                password: hashedPassword
            };

        accountsCollection.update({'name': account.login}, {
            $set: tmp
        }, {upsert: false}, (err, result) => {
            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }
            if (result) {
                return reply(result).code(200);
            }
        });
    } catch (err) {
        return reply(Boom.wrap(err, 'Internal error'));


    }
}

const updateAccountAdmin = (account, accountsCollection, reply) => {
    try {
        let tmp = {
            accounts: ""
        };
        accountsCollection.update({'name': account.name}, {
            $unset: tmp
        },  (err, result) => {
            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }
            if (result) {
                accountsCollection.update({'name': account.name}, {
                    $set: account
                }, {upsert: false}, (err, result) => {
                    if (err) {
                        return reply(Boom.wrap(err, 'Internal MongoDB error'));
                    }
                    if (result) {
                        return reply(result).code(200);
                    }
                });
            }
        });


    } catch (err) {
        return reply(Boom.wrap(err, 'Internal error'));


    }
}


module.exports.update = {
    auth: 'jwt',
    handler: function (request, reply) {
        const account = request.payload;
        const accountsCollection = mongojs.db().collection('accounts');
        var accountBelongToUser = (request.auth.credentials.name === account.login) || (request.auth.credentials.email === account.login);
        if (accountBelongToUser) {
            if (!account.password_old) {
                return reply({
                    errorMSG: "Old password wrong",
                    errorMSGRu: "Старый пароль неверен"
                }).code(403);
            }
            accountsCollection.findOne({'name': account.login}, (err, result) => {
                    if (err) {
                        return reply(Boom.wrap(err, 'Internal MongoDB error'));
                    }
                    if (result) {
                        bcrypt.compare(account.password_old, result.password, (err, res) => {
                            "use strict";
                            if (err) {
                                return reply(Boom.wrap(err, ''));
                            }
                            if (res) {
                                updateAccount(account, accountsCollection, reply);

                            }
                            else {
                                return reply({
                                    errorMSG: "Old password wrong",
                                    errorMSGRu: "Старый пароль неверен"
                                }).code(403);
                            }

                        });


                    } else {
                        return reply({
                            errorMSG: "Access is denied",
                            errorMSGRu: "Доступ запрещен"
                        }).code(403);
                    }


                }
            );
        } else {

            return reply({
                errorMSG: "Access is denied!",
                messageRu: "Доступ запрещен!"
            }).code(403);


        }


    }
}


module.exports.updateAdmin = {
    auth: 'jwt',
    handler: function (request, reply) {
        const account = request.payload;
        const accountsCollection = mongojs.db().collection('accounts');
        var isAdmin = request.auth.credentials.roles.indexOf('ADMIN') >= 0;

        if (isAdmin) {
            updateAccountAdmin(account, accountsCollection, reply);
        }
        else {
            return reply({
                errorMSG: "Access is denied!",
                messageRu: "Доступ запрещен!"
            }).code(403);

        }


    }
}


// Add account
module.exports.post = {
    auth: 'jwt',
    handler: function (request, reply) {
        const account = request.payload;
        if (request.auth.credentials.roles.indexOf('ADMIN') >= 0) {
            const accountsCollection = mongojs.db().collection('accounts');
            accountsCollection.findOne({$or: [{'name': account.name}, {'email': account.email}]}, (err, result) => {
                    if (err) {
                        return reply(Boom.wrap(err, 'Internal MongoDB error'));
                    }
                    if (result) {
                        var validate = [];
                        if (result.name === account.name) {
                            validate.push({
                                'valid': false,
                                'field': 'name',
                                'message': 'пользователь с таким логином существует'
                            });
                        }
                        if (result.email === account.email) {
                            validate.push({
                                'valid': false,
                                'field': 'email',
                                'message': 'пользователь с таким email существует'
                            });
                        }

                        return reply({validate}).code(404);
                    }
                    // Encryption


                    try {
                        if (account.password) {
                            var hashedPassword = bcrypt.hashSync(account.password);
                            account.password = hashedPassword;
                        }
                        accountsCollection.insert(account, (err, result) => {
                            if (err) {
                                return reply(Boom.wrap(err, 'Internal MongoDB error'));
                            }

                            reply("ок").code(200);
                        });
                    } catch (Err) {
                        return reply(Boom.wrap(err, 'Internal  error'));
                    }


                }
            );
        } else {
            reply().code(403);

        }


    }
}
;

//
// request { email  }
module.exports.generatePasswordOverEmail = {
    handler: function (request, reply) {
        const account = request.payload;

        const mode = request.params.mode ? encodeURIComponent(request.params.mode) : 'custody';
        const accountsCollection = mongojs.db().collection('accounts');
        accountsCollection.findOne({'email': account.email}, (err, result) => {
            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            if (result) {
                let password = passwordGenerator.generate({
                    length: 10,
                    numbers: true
                });

                let mailOptions = {
                    from: config.mail.admin_email, // sender address
                    to: result.email, // list of receivers
                    subject: 'Your p@ssw0rd changed', // Subject line
                    //text: 'Hello world ?', // plain text body
                    //html:config.mail.restorePasswordText+ '<b>Your p@ssw0rd is :' + password + '</b>' // html body
                    html: config.mail.restorePasswordText + `Your l@gin is :` + result.name + ` <br>   Your p@ssw0rd is :` + password + `<br>`+ config.mail.restorePasswordText2 // html body
                };
                let account = {
                    login: result.name,
                    password: password
                }

                mailTransporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return reply(error.message).code(200);
                    }
                    updateAccount(account, accountsCollection, reply, false);

                });
            } else {
                return reply({
                    errorMSG: "Wrong email!",
                    messageRu: "Wrong email!"
                }).code(403);

            }


        });


    }
}


module.exports.test = {
    handler: function (request, reply) {

        reply('lsdhklfshjhf').code(200);

    }


};


// Delete account
module.exports.delete = {
    auth: 'jwt',
    handler: function (request, reply) {
        const account = request.payload;
        if (request.auth.credentials.roles.indexOf('ADMIN') >= 0) {
            const accountsCollection = mongojs.db().collection('accounts');
            accountsCollection.remove({'name': account.name}, (err, result) => {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }
                if (result) {

                    return reply().code(200);
                }

            });
        } else {
            reply().code(403);

        }


    }
};
