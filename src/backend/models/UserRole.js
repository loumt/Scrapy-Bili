const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
    name: 'UserRole',
    tableName: 'm_user_role'
}

let UserRole = sequelize.define(modelProp.name, {
    uid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    rid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: modelProp.tableName,
    comment: '用户角色表'
});

module.exports = UserRole;