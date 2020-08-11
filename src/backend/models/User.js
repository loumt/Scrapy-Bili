const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
    name: 'User',
    tableName: 'm_user'
}

let User = sequelize.define(modelProp.name, {
    id: {
        type: DataTypes.BIGINT,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '唯一id'
    },
    face: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        defaultValue: "",
        comment: "盐"
    },
    isAdmin: {
        type: DataTypes.TINYINT,
        allowNull: false,
        default: 0,
        comment:"是否为管理员"
    },
    ctime:{
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '创建时间'
    },
    utime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '更新时间'
    }
}, {
    timestamps: false,
    tableName: modelProp.tableName,
    comment: '用户表'
});

module.exports = User;