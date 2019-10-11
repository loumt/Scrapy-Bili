const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
  name: 'Uper',
  tableName: 'bl_uper'
}

let Uper = sequelize.define(modelProp.name, {
  id: {
    type: DataTypes.BIGINT,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    comment: '唯一id'
  },
  bid: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  face: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    comment: "等级"
  },
  sign: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: "签名"
  },
  contribute: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: "投稿数量"
  },
  attention: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: "关注"
  },
  fans: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: "粉丝数量"
  },
  play: {
    type: DataTypes.INTEGER,
    comment: "播放量"
  },
  read: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: "阅读量(todo)"
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
  comment: 'UP主信息主表'
});

module.exports = Uper;