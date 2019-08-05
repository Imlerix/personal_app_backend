const { Note } = require('../db')
const express = require('express');
const router = express.Router();

// const db = {
//     db: require('../db')
// }

router.get('/', async function(req, res, next) {
    res.send(await Note.findAll({
        where: {user_id: 1}
    }))
})

module.exports = router;
