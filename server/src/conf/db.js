/**
 * @description 存储配置
 * @author eyz
 */

 const { isProd } = require('../utils/env')

 let REDIS_CONF = {
     port: 6379,
     host: '127.0.0.1'
 }
 
 let MYSQL_CONF = {
     host: '127.0.0.1',
     user: 'root',
     password: '123456',
     port: '3306',
     database: 'long_march_db'
 }
 
 if (isProd) {
     REDIS_CONF = {
         // 线上的 redis 配置
         port: 6379,
         host: '127.0.0.1'
     }
 
     MYSQL_CONF = {
         // 线上的 mysql 配置
         host: 'localhost',
         user: 'root',
         password: 'Mysql_2021',
         port: '3306',
         database: 'longmarch_db'
     }
     
 }
 
 module.exports = {
     REDIS_CONF,
     MYSQL_CONF
 }
 