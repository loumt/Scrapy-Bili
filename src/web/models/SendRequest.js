const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
  name: 'SendRequest',
  tableName: 'bl_send_request'
}

let SendRequest = sequelize.define(modelProp.name, {
  id: {
    type: DataTypes.BIGINT,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    comment: '唯一id'
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "请求地址"
  },
  type: {
    type: DataTypes.TINYINT,
    comment: "类型 1:用户 2.定时器"
  },
  stime: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    comment: '发起时间'
  }
}, {
  timestamps: false,
  tableName: modelProp.tableName,
  comment: '请求记录表'
});

module.exports = SendRequest;