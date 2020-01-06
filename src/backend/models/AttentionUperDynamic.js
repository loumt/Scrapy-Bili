const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
  name: 'AttentionUperDynamic',
  tableName: 'bl_attention_uper_dynamic'
}

let AttentionUperDynamic = sequelize.define(modelProp.name, {
  id: {
    type: DataTypes.BIGINT,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    comment: '唯一id'
  },
  mid: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: false
  },
  did: {
    type: DataTypes.STRING,
    // allowNull: false,
    // unique: true,
    comment: "Sequelize的bug问题导致不能设置成bigint"
  },
  type: {
    type: DataTypes.INTEGER,
    comment: "动态类型"
  },
  aid: {
    type: DataTypes.BIGINT,
    allowNull: true,
    unique: false,
    comment: "视频Id"
  },
  title : {
    type: DataTypes.TEXT,
    comment: "标题"
  },
  description: {
    type: DataTypes.TEXT,
    comment: "描述"
  },
  content: {
    type: DataTypes.TEXT,
    comment: "内容,type=1"
  },
  dynamic:{
    type: DataTypes.TEXT,
    comment: "内容,type=8"
  },
  repost: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: "转发人数"
  },
  reply: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: "评论数"
  },
  like: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: "获赞数"
  },
  ptime: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: '发布时间'
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
  comment: '动态表'
});

module.exports = AttentionUperDynamic;