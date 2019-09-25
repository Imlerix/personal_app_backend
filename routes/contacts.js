const {
    Link,
    sequelize,
    Sequelize
} = require('../db');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', async function (req, res, next) {

    let links = await Link.findAll({where: { isContacts: true }})

    res.json(links)
        .catch((e) => {
            req.error = e;
        })
    next()
})

router.post('/mail', async function (req, res, next) {
    const {
        email,
        name,
        subject,
        message
    } = req.body;
    const patternEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const testEmail = patternEmail.test(email) || false;

    if (email !== '' && name !== '' && subject !== '' && message !== ''){
        if (testEmail){

            async function main() {

                let transporter = nodemailer.createTransport({
                    service: 'Yandex',
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASSWORD
                    }
                });


                let info = await transporter.sendMail({
                    from: "vadim.golenko@yandex.ru",
                    to: 'vadim.golenko@yandex.ru',
                    subject: "UDACHIN // " + email + " // " + subject,
                    text: message,
                    html: ''
                });
            }

            main()
                .then(response => {
                    res.json({
                        status: 'success',
                        code: "200"
                    })
                })
                .catch(e => {
                console.log("e")
                console.log(e)
                res.json({
                    status: 'error',
                    error: e
                })
            });

        } else {
            res.json({
                status: 'error',
                error: "Incorrect e-mail"
            })
        }
    } else {
        res.json({
            status: 'error',
            error: "Params were not passed"
        })
    }
})

module.exports = router
