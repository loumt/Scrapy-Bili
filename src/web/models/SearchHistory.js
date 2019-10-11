const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
  name: 'SearchHistory',
  tableName: 'bl_search_history'
}

let SearchHistory = sequelize.define(modelProp.name, {
  id: {
    type: DataTypes.BIGINT,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    comment: '唯一id'
  },
  bid: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    comment: "番剧名或者Up主昵称"
  },
  stime: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    comment: '查询时间'
  }
}, {
  timestamps: false,
  tableName: modelProp.tableName,
  comment: '查询历史表'
});

module.exports = SearchHistory;