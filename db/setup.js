const { TodoLists, Todos}= require('../models')

async function setup(){
    await TodoLists.sync({force: true})
    await Todos.sync({force: true})
  }
  setup()