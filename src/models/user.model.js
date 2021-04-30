module.exports = (sequelize, Sequelize) => {
    const user  = sequelize.define('users', {
        nom :{
            type: Sequelize.STRING
        },
        prenom :{
            type: Sequelize.STRING
        }
    });
    return user;
}