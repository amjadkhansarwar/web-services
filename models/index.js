const TodoLists = require('./TodoLists')
const Todos = require('./Todos')


TodoLists.hasMany( Todos, {
      foreignKey:'todo_list_id'
  })
  Todos.belongsTo( TodoLists )

  module.exports = {Todos,TodoLists}