const BaseService = require('./BaseService')
const db = require('./../models')

class UserRoleService extends BaseService {
    constructor() {
        super(db["RolePermission"])
        db["RolePermission"].hasOne(db["Permission"], {foreignKey: 'id', sourceKey: 'pid'});
    }


    async findPermissionsWithRoleId(page, limit, roleId) {
        let offset = limit * (page - 1)
        let data = await this.model.findAndCountAll({
            limit, offset,
            where: {
                rid: roleId
            },
            raw: true,
            include: [
                {
                    model: db['Permission'],
                    attributes: ["id", "code", "desc", "ctime"]
                }
            ]
        })
        data.rows.forEach(row => {
            row.id = row['Permission.id']
            row.code = row['Permission.code']
            row.desc = row['Permission.desc']
            delete row['rid']
            delete row['pid']
            delete row['Permission.id']
            delete row['Permission.code']
            delete row['Permission.desc']
            delete row['Permission.ctime']
        })
        return data;
    }

}

module.exports = new UserRoleService();