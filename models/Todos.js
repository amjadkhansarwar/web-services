const { Sequelize, Model, DataTypes } = require('sequelize')

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './db/todo.sqlite'
})

class Todos extends Model {
   static async getall(){
    const todo_list = await Todos.findAll();
    return todo_list
}
}
Todos.init({
      id:{
        type:  DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
         content: DataTypes.STRING,
         done:{
            type: DataTypes.INTEGER,
            defaultValue: 0
         } 
       }, 
       {
          sequelize: database, 
          modelName: 'Todos',
          timestamps: false 
        }
        )
module.exports = Todos