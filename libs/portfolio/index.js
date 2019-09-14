const {
    Folder,
    File,
    Project,
    Skill,
    Image,
    Link,
    sequelize,
    Sequelize
} = require('../../db');

async function getChilds(parentId) {
    let folders = await Folder.findAll({where: {parent_id: parentId}})
        .then(async (folders) => {
            if (folders) {
                return await Promise.all(await folders.map( async (folder) => {
                    folder = folder.toJSON()
                    folder.type = 'folder'
                    folder.childs = [...await getChilds(folder.id.toString())]
                    return folder
                }))
            }
        })
    let projects = await Project.findAll({
        where: {parent_id: parentId},
        attributes: [
            'id',
            'parent_id',
            'name_ru',
            'name_en',
            'icon',
            'url',
            'url',
        ]
    })
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

    return [
        ...folders,
        ...projects,
        ...files,
    ]
}

module.exports = {
    getChilds
}
