const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
    name: 'Permission',
    tableName: 'm_permission'
}

let Permission = sequelize.define(modelProp.name, {
    id: {
        type: DataTypes.BIGINT,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '唯一id'
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rule : {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "规则"
    },
    type: {
        type: DataTypes.TINYINT,
        allowNull: true,
        comment:"类型,1目录,2请求"
    },
    disable: {
        type: DataTypes.TINYINT,
        allowNull: true,
        default: 0,
        comment:"是否禁用,0允许,1,禁用"
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
    comment: '权限表'
});

module.exports = Permission;