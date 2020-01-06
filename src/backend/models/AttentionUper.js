const {DataTypes} = require('sequelize');
const {sequelize,Sequelize} = require('./../lib/SequlizeConnection');

const modelProp = {
  name: 'AttentionUper',
  tableName: 'bl_attention_uper'
}

let AttentionUper = sequelize.define(modelProp.name, {
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
    unique: true,
    references: {
      model: 'bl_uper',
      key: 'bid'
    }
  },
  utime: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: '更新时间'
  },
  ctime: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    comment: '关注时间'
  }
}, {
  timestamps: false,
  tableName: modelProp.tableName,
  comment: 'UP主关注表'
});

module.exports = AttentionUper;