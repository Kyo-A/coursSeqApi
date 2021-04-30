module.exports = (sequelize, Sequelize) => {
    const post  = sequelize.define('posts', {
        titre :{
            type: Sequelize.STRING
        },
        userId :{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'users',
                key: 'id',
                as: 'userId'
            },
        }
    });
    return post;
}