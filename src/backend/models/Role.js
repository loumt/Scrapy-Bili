const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
    name: 'Role',
    tableName: 'm_role'
}

let Role = sequelize.define(modelProp.name, {
    id: {
        type: DataTypes.BIGINT,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '唯一id'
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "角色名"
    },
    remark: {
        type: DataTypes.TEXT,
        allowNull: true
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
    comment: '角色表'
});

module.exports = Role;