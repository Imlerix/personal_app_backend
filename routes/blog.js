const { Article, Tag } = require('../db');
const express = require('express');
const router = express.Router();

// const db = {
//     db: require('../db')
// }

router.get('/', async function(req, res, next) {
    let articles = await Article.findAll()

    articles = await Promise.all( await articles.map( async (article) => {
        article.tags = await Promise.all( await article.tags.map( async (tag) => {
            return await Tag.findOne({where: { id: tag }})
        }))
        return article
    }))

    res.send(articles).catch((e) => {
        req.error = e;
        next()
    })
})

module.exports = router;
