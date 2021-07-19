
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection')

class Post extends Model {}

Post.init(
    {
        post_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type: DataTypes.TEXT('tiny'),
            allownull: false,
        },
        
        content : {
            type: DataTypes.STRING,
            allownull: false,
        },
        
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freeseTableName: true,
        underscored: true,
        modelName: 'post'
    }
)

module.exports = Post