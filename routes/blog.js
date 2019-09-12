const { Article, Tag, Comment, sequelize, Sequelize } = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {


    let {tags, filter, page, search} = req.query;
    console.log(req.query)
    tags = tags ? tags.split(',') : tags;
    console.log(tags)

    let options = {
        limit: 20,
        offset: 20 * (page - 1),
        where: {}
    }

    if (tags) {
        options.where = {
            ...options.where,
            tags: { $contains: tags }
        }
    }
    if (search) {
        options.where = {
            ...options.where,
            $or: [
                {name_RU: {$iLike: `%${search}%`}},
                {name_EN: {$iLike: `%${search}%`}},
                {text_RU: {$iLike: `%${search}%`}},
                {text_EN: {$iLike: `%${search}%`}},
            ]
        }
    }
    switch (filter) {
        case 'recent':
            options = {
                ...options,
                order: [
                    ['date', 'DESC']
                ]
            }
            break;
        case 'best':
            options = {
                ...options,
                order: [
                    ['views', 'DESC']
                ]
            }
            break;
        default: //all
            break;
    }

    let articles = await Article.findAll( options )


    articles = await Promise.all( await articles.map( async (article) => {
        article = article.toJSON()
        article.tags = await Promise.all( await article.tags.map( async (tag) => {
            return await Tag.findOne({where: { id: tag }})
        }))
        article.commentsCount = await Comment.count({where: {articleId: article.id}})
        return article
    }))

    const tagsAll = await Tag.findAll(
        {
            attributes: [ 'id', 'name' ]
        }
    )

    const articlesAmount = await Article.findAndCountAll()

    res.json({ articles, tags: tagsAll, articlesAmount: articlesAmount.count }).catch((e) => {
        req.error = e;
    })
    next()
})

router.get('/:id', async function (req, res, next) {
    let article = await Article.findOne({where: {id: req.params.id}})
    article = article.toJSON()
    if (article)
        article.tags = await Promise.all( await article.tags.map( async (tag) => {
            return await Tag.findOne({where: { id: tag }})
        }))
    else
        article = { error: 'Article not exist'}

    article.comments = await Comment.findAll({where: {articleId: article.id}})

    res.json(article)
        .catch((e) => {
            req.error = e;
        })
    next()
})

router.post('/incrementViews/:id', async function (req, res, next) {
    let article = await Article.findOne({
        where: {
            id: req.params.id
        }
    })
    article = article.toJSON()

    Article.update(
        {
            views: ++article.views
        }, {
            where: {
                id: req.params.id
            }
        }
    )
    next()
})

module.exports = router;
