const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
  name: 'VUperAttention',
  tableName: 'bl_v_attention_uper'
}

let VUperAttention = sequelize.define(modelProp.name, {
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
  }
}, {
  timestamps: false,
  tableName: modelProp.tableName,
  comment: 'UP主关注视图'
});

module.exports = VUperAttention;