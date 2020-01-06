const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
  name: 'UperTask',
  tableName: 'bl_uper_task'
}

let UperTask = sequelize.define(modelProp.name, {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  repeat_tag: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    comment : "重复标记"
  },
  urgent: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    comment : "急迫的任务,1时定时器优先"
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
  comment: 'UP主定时任务表'
});

module.exports = UperTask;