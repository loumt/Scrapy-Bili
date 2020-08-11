const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
    name: 'RolePermission',
    tableName: 'm_role_permission'
}

let RolePermission = sequelize.define(modelProp.name, {
    rid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    pid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: modelProp.tableName,
    comment: '角色权限关联表'
});

module.exports = RolePermission;