const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
    name: 'LoginLog',
    tableName: 'm_login_log'
}

let LoginLog = sequelize.define(modelProp.name, {
    id: {
        type: DataTypes.BIGINT,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '唯一id'
    },
    username : {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "用户名"
    },
    type: {
        type: DataTypes.TINYINT,
        allowNull: false,
        default: 0,
        comment:"类型,0登出,1,登录"
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
    comment: '登录日志表'
});

module.exports = LoginLog;