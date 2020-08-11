const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
    name: 'SystemMessage',
    tableName: 'bl_system_message'
}

let SystemMessage = sequelize.define(modelProp.name, {
    id: {
        type: DataTypes.BIGINT,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '唯一id'
    },
    bid: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    aid: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    mid: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    type : {
        type: DataTypes.TINYINT,
        allowNull: false,
        default: 0,
        comment:"消息类型"
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        comment: "标题"
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        comment: "信息"
    },
    remark: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
        comment: "备注"
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
    comment: '系统消息'
});

module.exports = SystemMessage;