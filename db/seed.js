const { TodoLists, Todos}= require('../models')

async function seed(){
 
    const icecream = await TodoLists.bulkCreate(
    [   {
          title: 'Skolan',
          color: 'red'
        },
        {
            title: 'Gymet',
            color: 'green'
          },
          {
            title: 'Städa',
            color: 'blue'
          },
    ]
      )
       await Todos.bulkCreate([
          {
          content: 'I need to goto school 8:00 AM',
          done: 0
          },
          {
            content: 'I need to goto Gym a8:00 AM',
            done: 0
            },
            {
                content: 'I need to goto hemma 20:00 AM',
                done: 0
                }
        ]
        )  
}
seed()