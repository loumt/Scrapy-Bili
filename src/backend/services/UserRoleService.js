const BaseService = require('./BaseService')
const db = require('./../models')

class UserRoleService extends BaseService {
    constructor() {
        super(db["UserRole"])
        db["UserRole"].hasOne(db["Role"], {foreignKey: 'id', sourceKey: 'rid'});
    }


    async findRolesWithUserId(page, limit, userId) {
        let offset = limit * (page - 1)
        let data = await this.model.findAndCountAll({
            limit, offset,
            where: {
                uid: userId
            },
            raw: true,
            include: [
                {
                    model: db['Role'],
                    attributes: ["id", "name", "remark"]
                }
            ]
        })
        data.rows.forEach(row => {
            row.id = row['Role.id']
            row.name = row['Role.name']
            row.remark = row['Role.remark']
            delete row['uid']
            delete row['rid']
            delete row['Role.id']
            delete row['Role.name']
            delete row['Role.remark']
        })
        return data;
    }

}

module.exports = new UserRoleService();