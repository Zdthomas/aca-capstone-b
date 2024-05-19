const mysql = require('mysql2')
require('dotenv').config()

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating mysql connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: 'database-1.cp02w8cg6i9y.us-east-2.rds.amazonaws.com',
        user: 'admin',
        password: process.env.DB_MASTER_PASSWORD,
        database: 'aca_capstone'
        // host: process.env.DB_HOST,
        // user: process.env.DB_USER,
        // password: process.env.DB_PASSWORD,
        // database: process.env.DB_DEFAULT_SCHEMA
      })

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;