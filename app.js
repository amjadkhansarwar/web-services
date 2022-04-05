const express = require('express')
const sqlite = require('sqlite3')
const {TodoLists, Todos} = require('./models')
const controller = require('./controller/todolists')
const app = express()
const db = new sqlite.Database("todos.db")
const PORT = 5000
let todolists= new TodoLists

app.use( express.json() )

app.use((req, res, next) => {
  console.log(`Handling request for ${req.method} ${req.path}`)
  next()
})

app.use((req, res, next) => {
  if(req.method == 'POST' && req.headers['content-type'] != 'application/json'){
    return res.status(400).json({error: 'Missing header Content-Type: application/json'})
  }
  next()
})

app.get('/alltodolists', controller.gettodolists)

// async(req, res) => {
//     let row = await todolists.getall()
// //   db.get("SELECT * FROM todo_lists", function(err, row){
// //     res.json(row)
// //   })
// res.json(row)
// })

app.post('/newtodolist', (req, res) => {
  const {title, color} = req.body
  if(!(title || color)){
    return res.status(400).json({error: "Invalid body"})
  }
  db.run(`INSERT INTO todo_lists(title,color) VALUES (?, ?)`, [title,color], function(error){
    if(error){
      return res.status(500).json({error})
    }

    db.get(`SELECT * FROM todo_lists WHERE id = ?`, [this.lastID], function(err, row){
      res.json({message:"Success", data:row})
    })
  })
})

app.post('/newtodo', (req, res) => {
  const {todoListID, content} = req.body
  if(!(todoListID || content)){
    return res.status(400).json({error: 'Invalid body'})
  }
  db.run(`INSERT INTO todos(content, todo_list_id) VALUES (?,?)`, [content, todoListID], function(error){
    if(error){
      return res.status(500).json({error})
    }
    db.get(`SELECT * FROM todos WHERE id = ?`, [this.lastID], function(err, row){
      res.json({message: 'Success', data:row})
    })
  })
})

app.get('/gettodolists', (req, res) => {
  db.all(`SELECT * FROM todo_lists`, function(error, rows){
    if(error){
      return res.status(500).json({error})
    }
    res.json({message: 'Success', data: rows})
  })
})

app.get('/gettodos', (req, res) => {
  const {todoListID} = req.body
  switch(req.query.done){
    case 'true':
    case 'false':
      const done = req.query.done == 'true' ? 1 : 0
      db.all(`SELECT * FROM todos WHERE todo_list_id = ? AND done = ?`, [todoListID, done], function(error, rows){
        if(error){
          res.status(500).json({error})
        }
        res.json({message: 'Success', data: rows})
      })
      break;
    default:
      db.all(`SELECT * FROM todos WHERE todo_list_id = ?`, [todoListID], function(error, rows){
        if(error){
          res.status(500).json({error})
        }
        res.json({message: 'Success', data: rows})
      })
  }
  
})


app.get('/gettodo', (req, res) => {
  const {id} = req.body
  if(!id){ 
    return res.status(400).json({error: 'Invalid body'})
  }
  db.get(`SELECT * FROM todos WHERE id = ?`, [id], function(error, row){
    if(error){
      res.status(500).json({error})
    }
    res.json({message: 'Success', data: row})
  })

    
})

app.post('/updatetodolist', (req, res) => {
  const {id, title, color} = req.body
  if(!(id || title || color)){
    return res.status(400).json({error: 'Invalid body'})
  }
  db.run(`UPDATE todos SET title = ?, color = ? WHERE id = ?`, [title,color,id], function(error){
    if(error){
      return res.status(400).json({error})
    }
    res.json({message: 'Todo list updated'})
  })
})

app.post('/updatetodo', (req, res) => {
  const {id, content} = req.body
  const done = req.body.done == 'true' ? 1 : 0
  if(!(id || content || done)){ 
    return res.status(400).json({error: "Invalid body"})
  }
  db.run(`UPDATE todos SET content = ?, done = ? WHERE id = ?`, 
    [content,done,id],
    function(error){
      if(error){
        return res.status(500).json({error})
      }
      res.json({message: 'Todo updated'})
    }
  )
})

app.post('/deletetodolist', (req, res) => {
  const {id} = req.body
  if(!id){
    return res.status(400).json({error: 'Invalid body, missing id'})
  }
  db.run(`DELETE FROM todo_lists WHERE id = ?`, [id], function(error){
    if(error){
      return res.status(500).json({error})
    }
    if(this.changes == 0){
      return res.status(404).json({error: `Todo list with id ${id} not found`})
    }

    res.json({message: 'Todo list deleted'})
  })
})

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS todo_lists")
  db.run("DROP TABLE IF EXISTS todos")
  db.run(`CREATE TABLE "todo_lists" ("id"	INTEGER,"title"	TEXT NOT NULL,"color"	TEXT NOT NULL DEFAULT 'white',PRIMARY KEY("id" AUTOINCREMENT));`)
  db.run(`CREATE TABLE "todos" ("id"	INTEGER,"content"	TEXT NOT NULL DEFAULT '',"done" INTEGER NOT NULL DEFAULT 0,"todo_list_id"	INTEGER,PRIMARY KEY("id" AUTOINCREMENT),FOREIGN KEY("todo_list_id") REFERENCES "todo_lists"("id"));`)
  db.get("PRAGMA foreign_keys = ON") // Enable SQL error on foreign key constraints
  app.listen(PORT, () => console.log("Running on port " + PORT))
})