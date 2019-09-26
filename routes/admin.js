const { User, Token } = require('../db');
const express = require('express');
const router = express.Router();

const libs = {
    admin: require('../libs/admin')
}

const auth = libs.admin.authByToken;

router.get('/blog', async function (req, res, next) {
    console.log(req.cookies.token)
    res.json({
        status: 'ok',
        cook: req.cookies.token
    })
})


module.exports = router;
