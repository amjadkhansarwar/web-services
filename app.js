const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/chinook.db')
const DEFAULT_PAGE_SIZE = 10

app.use(express.json())
  
app.get('/',  (req, res)=>{
    const page = req.query.page ? + req.body.page: 1
    const pageSize = req.query.pageSize || DEFAULT_PAGE_SIZE
    db.all('SELET * albums LIMIT ? OFFSET ?', [pageSize, (page -1)*pageSize], (error, rows)=>{
        res.json()
    })
    
    res.send(data)
})
app.post('/')
app.listen(8000)