const Sequelize = require('sequelize')

class BaseService {
  constructor(model) {
    this.model = model;
    this.Op = Sequelize.Op
  }

  all() {
    return this.model.findAll()
  }

  findByPk(_id) {
    return this.model.findByPk(_id)
  }

  save(model) {
    return this.model.create(model)
  }

  /**
   * @param findOptions
   * @param updateOptions
   */
  updateOne(findOptions, updateOptions) {
    return this.model.update(updateOptions, {where: findOptions})
  }

  findOneAndUpdate(option, update) {
    return this.model.findOneAndUpdate(option, update)
  }

  deleteOne(options) {
    return this.model.destroy({where: options})
  }

  deleteById(id) {
    return this.model.destroy({where: {id: id}})
  }

  count(options) {
    if (options)
      return this.model.count({where: options});
    return this.model.count()
  }

  find(selectors, options, select) {
    return this.model.findAll(selectors, select, options)
  }

  findAndCountAll(options) {
    return this.model.findAndCountAll({where: options.where, offset: options.skip, limit: options.limit})
  }

  findOne(options) {
    return this.model.findOne(options)
  }

}

module.exports = BaseService