const Sequelize = require('sequelize');
const { Model, Op } = Sequelize;

const sequelize = new Sequelize(process.env.DB, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
    host: process.env.DEV === 'true' ? 'localhost' : 'db', // change to db with Docker
    dialect: 'postgres',
    logging: false,
    define: {
        underscored: true
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: {
        $eq: Op.eq,
        $ne: Op.ne,
        $gte: Op.gte,
        $gt: Op.gt,
        $lte: Op.lte,
        $lt: Op.lt,
        $not: Op.not,
        $in: Op.in,
        $notIn: Op.notIn,
        $is: Op.is,
        $like: Op.like,
        $notLike: Op.notLike,
        $iLike: Op.iLike,
        $notILike: Op.notILike,
        $regexp: Op.regexp,
        $notRegexp: Op.notRegexp,
        $iRegexp: Op.iRegexp,
        $notIRegexp: Op.notIRegexp,
        $between: Op.between,
        $notBetween: Op.notBetween,
        $overlap: Op.overlap,
        $contains: Op.contains,
        $contained: Op.contained,
        $adjacent: Op.adjacent,
        $strictLeft: Op.strictLeft,
        $strictRight: Op.strictRight,
        $noExtendRight: Op.noExtendRight,
        $noExtendLeft: Op.noExtendLeft,
        $and: Op.and,
        $or: Op.or,
        $any: Op.any,
        $all: Op.all,
        $values: Op.values,
        $col: Op.col
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Соединение успешно установленно!');
    })
    .catch(err => {
        console.error('Не удалось подключиться: ', err);
    });

// Blog class
class Article extends Model {}
class Comment extends Model {}
class Tag extends Model {}
//Portfolio class
class Folder extends Model {}
class File extends Model {}
class Project extends Model {}
class Skill extends Model {}
// Common class
class Image extends Model {}
class Link extends Model {}

// Blog init
Article.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    name_RU: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name_EN: {
        type: Sequelize.STRING,
        allowNull: true
    },
    text_RU: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text_EN: {
        type: Sequelize.STRING,
        allowNull: true
    },
    views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true
    },
}, { sequelize, modelName: 'article' });
Comment.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    articleId: {
        type: Sequelize.INTEGER,
        references: {
            model: Article,
            key: 'id'
        }
    }
}, { sequelize, modelName: 'comment' });
Tag.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {sequelize, modelName: 'tag' });

//Portfolio init
Folder.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    root: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    name_ru: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name_en: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parent_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    }
}, {sequelize, modelName: 'folder' });
File.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name_ru: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name_en: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parent_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    }
}, {sequelize, modelName: 'file' });
Project.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name_ru: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name_en: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parent_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    linkToSite: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role_ru: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role_en: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc_ru: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    desc_en: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    skills: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true
    },
    images: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true
    },
    links: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true
    },
}, {sequelize, modelName: 'project' })
Skill.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {sequelize, modelName: 'skill' });

// Common init
Image.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    src: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {sequelize, modelName: 'image' });
Link.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isContacts: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {sequelize, modelName: 'link' });


sequelize.sync()
    .then(() => {
        Tag.findOne({
            where: {
                id: 1
            }
        })
            .then(async (tag) => {
                if (!tag){
                    Tag.create({
                        name: 'Docker'
                    })
                }
            });
        Article.findOne({
            where: {
                tags: {
                    $contains: [1]
                }
            }
        })
            .then(async (article) => {
                if (!article){
                    Article.create({
                        date: new Date(),
                        name_RU: 'Настройка Docker c PRER',
                        name_EN: 'Config Docker with PRER',
                        text_RU: '',
                        text_EN: '',
                        tags: [1]
                    })
                }
            });
        Comment.findOne({
            where: {
                id: 1
            }
        })
            .then(async (comment) => {
                if (!comment){
                    Comment.create({
                        author: 'vasya_3000',
                        text: 'Docker очень классная технология',
                        date: new Date(),
                        articleId: 1
                    })
                }
            })
        Folder.findOne({ where: {id: 1} })
            .then(async (folder) => {
                if (!folder){
                    Folder.create({
                        id: 1,
                        root: true,
                        name_ru: 'Портфолио',
                        name_en: 'Portfolio',
                    })
                        File.create({
                            parent_id: 1,
                            name_ru: 'Обо мне',
                            name_en: 'About me',
                            url: '/about'
                        })
                        Folder.create({
                            id: 2,
                            parent_id: 1,
                            name_ru: 'Проекты',
                            name_en: 'Projects',
                            url: '/projects'
                        })
                            Folder.create({
                                id: 3,
                                parent_id: 2,
                                name_ru: 'Веб',
                                name_en: 'Web',
                                icon: 'http://icons.iconarchive.com/icons/bambulu/sailor-moon/256/luna-p-icon.png',
                                url: '/projects/web'
                            })
                                Project.create({
                                    parent_id: 3,
                                    name_ru: 'Udachin.tech',
                                    name_en: 'Udachin.tech',
                                    role_ru: 'Создатель сайта',
                                    role_en: 'Creator of the site',
                                    url: '/projects/web/udachin_tech',
                                    linkToSite: 'http://udachin.tech/',
                                    icon: 'https://cdn1.savepice.ru/uploads/2019/9/19/22693186150623c85e17e2ab6311c481-full.png',
                                    desc_ru: 'После того как мы с командой начали делать проект для нашего ВУЗа, я накопил опыта и решил сделать что-то свое. Поскольку университетский проект закрыт от чужих глаз, его код в резюме не положишь. Тогда мне и приходит на помощь этот сайт. Но помимо хвастовства, он всё же имеет практическую значимость: это хорошая централизация для всех ресурсов свзяанных со мной.',
                                    desc_en: 'After the team and I began to make a project for our university, I gained experience and decided to do something of my own. Since the university project is closed from prying eyes, you can’t put its code in the summary. Then this site comes to my aid. But besides boasting, it still has practical significance: it is a good centralization for all the resources connected with me.',
                                    skills: [1, 2, 3, 4, 5],
                                    images: [1, 2],
                                    links: [1, 2]
                                })
                                    Skill.create({
                                        name: 'ReactJS',
                                        icon: 'https://png.pngtree.com/svg/20170719/1217a8a69e.svg'
                                    })
                                    Skill.create({
                                        name: 'NodeJs',
                                        icon: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg'
                                    })
                                    Skill.create({
                                        name: 'Redux',
                                        icon: 'https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png'
                                    })
                                    Skill.create({
                                        name: 'Sequelize',
                                        icon: 'https://camo.githubusercontent.com/fdf4b414a9d3805d497cd2568aee16a24e4098a9/687474703a2f2f646f63732e73657175656c697a656a732e636f6d2f6d616e75616c2f61737365742f6c6f676f2d736d616c6c2e706e67'
                                    })
                                    Skill.create({
                                        name: 'Postgres',
                                        icon: 'https://user-images.githubusercontent.com/24623425/36042969-f87531d4-0d8a-11e8-9dee-e87ab8c6a9e3.png'
                                    })

                                    Image.create({
                                        title: 'Страница портфолио',
                                        src: 'https://sun9-27.userapi.com/c856016/v856016513/c113f/KDdbBZnEzx8.jpg'
                                    })
                                    Image.create({
                                        title: 'Главная страница',
                                        src: 'https://pp.userapi.com/c856016/v856016513/c1149/4iqOKkzBDtY.jpg'
                                    })
                                    Link.create({
                                        name: 'Backend репозиторий',
                                        url: 'https://github.com/Imlerix/personal_app_backend',
                                    })
                                    Link.create({
                                        name: 'Frontend репозиторий',
                                        url: 'https://github.com/Imlerix/personal_app_frontend',
                                    })
                    Link.create({
                        name: 'Github',
                        url: 'https://github.com/Imlerix',
                        isContacts: true,
                        icon: 'github'
                    })
                    Link.create({
                        name: 'Вконтакте',
                        url: 'https://vk.com/imlerix',
                        isContacts: true,
                        icon: 'vk'
                    })
                }
            });
    });

module.exports = {
    sequelize,
    Sequelize,
    Comment,
    Article,
    Tag,
    Folder,
    File,
    Project,
    Skill,
    Image,
    Link
}

