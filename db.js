const Sequelize = require('sequelize');
const { Model, Op } = Sequelize;

const sequelize = new Sequelize(process.env.DB, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
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
    }
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
                        name: 'Unity'
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
                        name_RU: 'Психичное прушенье',
                        name_EN: 'Psychofall',
                        text_RU: 'Смотрите это моя собака и она бегает за своим хвостом. Эх, это потому что у нее психичное прушенье. И у меня психичное прушенье. Пойду чаю попью',
                        text_EN: 'Look this is my dog ​​and she runs after her tail. Eh, this is because she has a mental collapse. And I have a mental collapse. I\'ll go have some tea',
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
                        author: 'Pupa',
                        text: 'Псу нужна мединская помощь, я щитаю...',
                        date: new Date(),
                        articleId: 1
                    })
                }
            })
        Folder.findOne({ where: {id: 1} })
            .then(async (folder) => {
                if (!folder){
                    Folder.create({
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
                            parent_id: 1,
                            name_ru: 'Проекты',
                            name_en: 'Projects',
                            url: '/projects'
                        })
                            Folder.create({
                                parent_id: 2,
                                name_ru: 'Веб',
                                name_en: 'Web',
                                icon: 'http://icons.iconarchive.com/icons/bambulu/sailor-moon/256/luna-p-icon.png',
                                url: '/projects/web'
                            })
                                Project.create({
                                    parent_id: 3,
                                    name_ru: 'Портал по подбору проектов',
                                    name_en: 'Portal of projects selection',
                                    role_ru: 'Создатель сайта',
                                    role_en: 'Creator of the site',
                                    url: '/projects/web/teams_mospolytech',
                                    linkToSite: 'http://teams.mospolytech.ru/',
                                    icon: 'https://lh3.googleusercontent.com/YzhvUZRsJnkZMaAl_Tj49SkSiVVb5OX8HJK7kDgbKd07QUqlcG7f2DG6LJLrcwYs3OI',
                                    desc_ru: 'Для того чтобы начать работу над проектами Для того чтобы начать работу над проектами вам необходимо зарегистрироваться на сайте в качестве исполнителя. Как только вы пройдёте процедуру регистрации у вас автоматически создастся ваша личная команда. Эта команда в вашем лице может записаться на проект, если выполнить его вы захотите в одиночку. вам необходимо зарегистрироваться на сайте в качестве исполнителя.',
                                    desc_en: 'In order to start work on the project, you need to register on the site as an artist. Once you complete the registration process, you will automatically create your personal team. This team in your person can sign up for a project. You need to register on the site as an artist. Once you complete the registration process, you will automatically create your personal team. This team in your person can sign up for a project.',
                                    skills: [1, 2],
                                    images: [1, 2],
                                    links: [1]
                                })
                                    Skill.create({
                                        name: 'ReactJS',
                                        icon: 'https://png.pngtree.com/svg/20170719/1217a8a69e.svg'
                                    })
                                    Skill.create({
                                        name: 'ReactJS',
                                        icon: 'https://png.pngtree.com/svg/20170719/1217a8a69e.svg'
                                    })
                                    Image.create({
                                        title: 'Главная страница',
                                        src: 'https://sun9-27.userapi.com/c856016/v856016513/c113f/KDdbBZnEzx8.jpg'
                                    })
                                    Image.create({
                                        title: 'Панель администрирования сайта',
                                        src: 'https://pp.userapi.com/c856016/v856016513/c1149/4iqOKkzBDtY.jpg'
                                    })
                                    Link.create({
                                        name: 'Backend репозиторий',
                                        url: 'https://ibb.co/xYm5Y4p',
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

