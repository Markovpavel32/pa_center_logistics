const Sequelize = require('sequelize');
const sequelize = require('../sequelize/sequelize_config')

const Model = Sequelize.Model;
class User extends Model {}
User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    customer_id: {
        type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    admin: {
        type: Sequelize.BOOLEAN
    },

}, {
    sequelize,
    modelName: 'user',
    // tableName: 'users'
});

User.schema('site')

module.exports = async () => {
    await User.create({ login: 'Брняский мяокомбинат', password: '123', customer_id: 'BMSK' }).then(jane => {
        console.log("Jane's auto-generated ID:", jane.id);
    });

    await User.findAll().then(users => {
        console.log("All users:", JSON.stringify(users, null, 4));
    });

}
