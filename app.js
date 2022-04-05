const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/chinook.db')
//const { Sequelize,Model, DataTypes } = require('sequelize');

// const database = new Sequelize({
//   dialect: 'sqlite',
//   storage: './db/chinook.db'
// })

  
app.get('/', async (req, res)=>{
    await db.open('./db/chinook.db')

    await db.close('./db/chinook.db')
    
    res.send(data)
})
app.post('/')
app.listen(8000)