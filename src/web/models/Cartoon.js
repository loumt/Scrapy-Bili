const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
  name: 'Cartoon',
  tableName: 'bl_cartoon'
}

let Cartoon = sequelize.define(modelProp.name, {
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
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originName : {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "原始名字"
  },
  banner: {
    type: DataTypes.STRING,
    comment: "海报图片地址"
  },
  fans: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: "追番人数"
  },
  ratingCount: {
    type: DataTypes.INTEGER,
    comment: "评分人数"
  },
  evaluate:{
    type: DataTypes.TEXT,
    allowNull: true,
    comment: "简介"
  },
  score: {
    type: DataTypes.INTEGER,
    comment: "综合得分"
  },
  ratingCode: {
    type: DataTypes.FLOAT,
    comment: "评分"
  },
  cancel:{
    type: DataTypes.TINYINT,
    defaultValue: 0,
    comment: "撤销"
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
  comment: '番剧表'
});

module.exports = Cartoon;