const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize(process.env.DB, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        underscored: true
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

class User extends Model {}
class Note extends Model {}

User.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    login: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'user' });

Note.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
    },
    isDone: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, { sequelize, modelName: 'note' });
Note.belongsTo(User);

sequelize.sync()
    .then(() => {
        User.findOne({where: {id: 1}})
            .then(async (user) => {
                if (!user){
                    User.create({
                        username: 'Vadim',
                        login: 'udachin',
                        password: '1234'
                    });
                    Note.create({
                        name: 'Приготовить яишенку',
                        comment: 'Добавить черри и бекон'
                    })
                    Note.create({
                        name: 'Помыть попу',
                        comment: 'С мочалкой и зубной щеткой'
                    })
                }
            });
    });


module.exports = {
    sequelize,
    Sequelize,
    User,
    Note
}

