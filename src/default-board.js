export const uuid = () => {
     return Math.random().toString(16).slice(2)
}

export const DEFAULT_BOARD = [
     {
          id: uuid(),
          name: 'todo',
          tasks: [
               {
                    description: '',
                    name: 'first task',
                    id: uuid()
               },
               {
                    description: '',
                    name: 'second task',
                    id: uuid()
               },
               {
                    description: '',
                    name: 'and third',
                    id: uuid()
               }
          ]
     },
     {
          id: uuid(),
          name: 'in-progress',
          tasks: [
               {
                    description: '',
                    name: 'first task',
                    id: uuid()
               }
          ]
     },
     {
          id: uuid(),
          name: 'done',
          tasks: [
               {
                    description: '',
                    name: 'first task',
                    id: uuid()
               }
          ]
     }
]

export default DEFAULT_BOARD