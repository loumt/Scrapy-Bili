const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
    name: 'Emoji',
    tableName: 'bl_emoji'
}

let Emoji = sequelize.define(modelProp.name, {
    id: {
        type: DataTypes.BIGINT,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '唯一id'
    },
    key : {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "表情key"
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "表情地址"
    },
    data: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "base64"
    },
    ctime:{
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '创建时间'
    }
}, {
    timestamps: false,
    tableName: modelProp.tableName,
    comment: '表情表'
});

module.exports = Emoji;