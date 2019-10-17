module.exports = {
  database: 'bilibili_v1.2.0-beta1',
  username: 'root',
  password: 'root',
  options: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: "+08:00"
  }
}
