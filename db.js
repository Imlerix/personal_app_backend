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

class Article extends Model {}
class Comment extends Model {}
class Tag extends Model {}

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
}, {sequelize, modelName: 'tag' })


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
    });


module.exports = {
    sequelize,
    Sequelize,
    Comment,
    Article,
    Tag,
}

