const { Sequelize, Model, DataTypes } = require('sequelize')

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './db/todo.sqlite'
})

class TodoLists extends Model {
async getall(){
    const todo_list = await TodoLists.findAll();
    return todo_list
 }
}
TodoLists.init({
      id:{
        type:  DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
         title: DataTypes.STRING,
         color: {
            type: DataTypes.STRING,
            defaultValue: 'white'
         }
       }, 
       {
          sequelize: database, 
          modelName: 'TodoLists',
          timestamps: false 
        }
        )
module.exports = TodoLists