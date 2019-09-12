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

const getChilds = async (parentId) => {
    let folders = await Folder.findAll({where: {parent_id: parentId}})
        .then(async (folders) => {
            if (folders) {
                return await Promise.all(await folders.map( async (folder) => {
                    folder = folder.toJSON()
                    folder.childs = [...await getChilds(folder.id.toString())]
                    return folder
                }))
            }
        })
    let projects = await Project.findAll({where: {parent_id: parentId}})
    let files = await File.findAll({where: {parent_id: parentId}})

    folders = folders || []
    projects = projects
        ?
        projects.map(project => {
            project = project.toJSON()
            project.type = 'project'
            return project
        })
        :
        []
    files = files
        ?
        files.map(file => {
            file = file.toJSON()
            file.type = 'file'
            return file
        })
        :
        []

    console.log("parentId"+parentId)
    console.log(folders)
    console.log(projects)
    console.log(files)
    return [
        ...folders,
        ...projects,
        ...files,
    ]
}

router.get('/', async function (req, res, next) {
    let folders = await Folder.findAll({ where: {id: 1} })
        .then(async (folders) => {
            if (folders) {
                return await Promise.all(await folders.map( async (folder) => {
                    folder = folder.toJSON()
                    folder.childs = await getChilds(folder.id.toString())
                    return folder
                }))

            }
        })

    res.json({dirs: folders})
        .catch((e) => {
            req.error = e;
        })
    next()

})

module.exports = router;
