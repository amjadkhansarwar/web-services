const res = require('express/lib/response')
const {TodoLists, Todos} = require('../models')
const { getall } = require('../models/Todos')

let todolists= new TodoLists

async function  gettodolists(req, res){
const rows = await todolists.getall()
res.json(rows)
}

module.exports={
    gettodolists
}