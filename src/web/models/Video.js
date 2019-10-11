const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
  name: 'Video',
  tableName: 'bl_video'
}

let Video = sequelize.define(modelProp.name, {
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
    comment: "用户Id"
  },
  aid: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
    comment: "视频Id"
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    comment: "视频标题"
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    comment: "视频子标题"
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    comment: "作者"
  },
  coin: {
    type: DataTypes.INTEGER,
    comment: "获币数"
  },
  share: {
    type: DataTypes.INTEGER,
    comment: "转发人数"
  },
  like: {
    type: DataTypes.INTEGER,
    comment: "获赞人数"
  },
  favorite: {
    type: DataTypes.INTEGER,
    comment: "收藏人数"
  },
  danmaku:{
    type: DataTypes.INTEGER,
    comment: "弹幕数"
  },
  view:{
    type: DataTypes.INTEGER,
    comment: "播放数"
  },
  comment: {
    type: DataTypes.INTEGER,
    comment: "评论人数"
  },
  duration: {
    type: DataTypes.INTEGER,
    comment: "持续时间"
  },
  pic: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    comment: "视频海报"
  },
  length: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
    comment: "视频长度"
  },
  desc: {
    type: DataTypes.TEXT,
    comment: "描述"
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
  comment: '视频表'
});

module.exports = Video;