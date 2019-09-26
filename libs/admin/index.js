const {User, Token} = require('../../db');
const crypto = require('bcrypt');
const fs = require('fs');
const rp = require('request-promise');

module.exports = {
    async getUser(id) {
        const where = {
            $or: []
        };
        if (typeof id === 'number' || !isNaN(parseInt(id))) {
            where.$or[0] = {id: parseInt(id)};
        }
        if (typeof id === 'string') {
            where.$or.push({id: id});
        }
        const user = await User.findOne({
            where,
            raw: true
        });
        if (!user)
            return {
                status: 0, error: "Пользователь не найден"
            };

        return {
            status: 1, user
        }

    },
    async authByToken(req, res, next) {
        if (req.headers['authorization']) {
            req.token = req.headers['authorization'].replace('Bearer ', '');
            const token = await Token.findOne({
                where: {token: req.headers['authorization'].replace('Bearer ', '')},
                attributes: ['user_id']
            });
            if (typeof res === 'boolean') {
                if (token) {
                    req.user = await User.findOne({where: {id: token.user_id}});
                    return req.user;

                } else return false;
            } else {
                if (token) {
                    req.user = await User.findOne({where: {id: token.user_id}});
                    next();
                } else {
                    res.status(401).json({
                        status: 0,
                        error: 'Токен доступа не найден'
                    })
                }
            }
        } else if (typeof res.status === 'function') res.status(401).json({
            status: 0,
            error: 'Ошибка при авторизации'
        })
    },
    async authByEmail(login, password) {

        if (login && password) {
            const user = await User.findOne({
                where: {login}
            });
            if (user) {
                const hash = user.password;
                const valid = await crypto.compare(password, hash);
                if (valid) {
                    const token = require('crypto').randomBytes(64).toString('hex');
                    await Token.create({
                        user_id: user.id,
                        token
                    });
                    return {
                        status: 1,
                        user: (await (this.getUser(user.id))).user,
                        token
                    }
                } else return {
                    status: 0,
                    error: 'Неверный пароль'
                }
            } else return {
                status: 0,
                error: 'Пользователя с таким логином не существует'
            }
        } else return {
            status: 0,
            error: 'Неверное имя пользователя или пароль'
        }

    },
    async register({login, password}) {
        if (!login)
            return {
                status: 0,
                error: "Не передано имя"
            }

        password = await crypto.hash(password, 10);
        const found = await User.findOne({where: {login}});
        if (found)
            return {
                status: 0,
                error: "Пользователь с таким логином уже существует"
            };

        const user = await User.create({
            login,
            password,
        }, {returning: true});
        const token = require('crypto').randomBytes(64).toString('hex');
        await Token.create({
            user_id: user.id,
            token
        });
        return {
            status: 1,
            token,
            user: (await (this.getUser(user.id))).user
        }

    }
}
