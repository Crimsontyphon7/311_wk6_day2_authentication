require('dotenv').config()
const mysql = require('mysql2')

const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_DEFAULT_SCHEMA

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating mysql connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: host,
        user: user,
        password: password,
        database: database
      })

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;