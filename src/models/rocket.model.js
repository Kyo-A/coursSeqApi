module.exports = (sequelize, Sequelize) => {
    const rocket  = sequelize.define('rockets', {
        nom :{
            type: Sequelize.STRING
        },
        annee_fab :{
            type: Sequelize.DATE
        },
        organisation :{
            type: Sequelize.STRING
        },
        destination :{
            type: Sequelize.STRING
        }
    });
    return rocket;
}