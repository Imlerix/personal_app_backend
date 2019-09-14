const {
    Folder,
    File,
    Project,
    Skill,
    Image,
    Link,
    sequelize,
    Sequelize
} = require('../db');
const express = require('express');
const router = express.Router();
const portfolioLib = require('../libs/portfolio')

router.get('/', async function (req, res, next) {
    let folders = await Folder.findAll({ where: {id: 1} })
        .then(async (folders) => {
            if (folders) {
                return await Promise.all(await folders.map( async (folder) => {
                    folder = folder.toJSON()
                    folder.type = 'folder'
                    folder.childs = await portfolioLib.getChilds(folder.id.toString())
                    return folder
                }))

            }
        })

    res.json(folders)
        .catch((e) => {
            req.error = e;
        })
    next()

})

router.get('/project/:id', async function (req, res, next) {
    let response = await Project.findOne({ where: {id: req.params.id} })
        .then(async (project) => {
            project.skills = await Promise.all( await project.skills.map( async (skill) => {
                return await Skill.findOne({where: { id: skill }})
            }))
            project.images = await Promise.all( await project.images.map( async (image) => {
                return await Image.findOne({where: { id: image }})
            }))
            project.links = await Promise.all( await project.links.map( async (link) => {
                return await Link.findOne({where: { id: link }})
            }))

            return project
        })

    res.json(response)
        .catch((e) => {
            req.error = e;
        })
    next()

})

module.exports = router;
