import React, { useContext } from 'react'
import useLocalStorage from '../hooks/use-local-storage'
import { uuid, DEFAULT_BOARD } from '../default-board'

const BoardContext = React.createContext({
     columns: [],
     addTask: (changedColumn, task) => {},
     addColumn: (columnName) => {},
     moveTask: (fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex) => {},
     moveColumn: (fromColumnIndex, toColumnIndex) => {}
})

export const useBoard = () => useContext(BoardContext)

export const BoardProvider = ({ children }) => {
     const [columns, setColumns] = useLocalStorage('board', DEFAULT_BOARD)

     const addTaskHandler = (changedColumn, task) => {
          setColumns(prevColumns => {
               const columnTasks = changedColumn.tasks.concat({ description: '', name: task, id: uuid() })

               return prevColumns.map(column => {
                    if(changedColumn.id === column.id) {
                         return { ...column, tasks: columnTasks }
                    }
                    return column
               })
          })
     }

     const addColumnHandler = (columnName) => {
          setColumns(prevColumns => {
               return prevColumns.concat({ id: uuid(), name: columnName, tasks: [] })
          })
     }

     const moveTaskHandler = (fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex) => {
          const toTaskIndexFallback = toTaskIndex !== null ? toTaskIndex : columns[toColumnIndex].tasks.length

          setColumns(prevColumns => {
               const newColumns = [...prevColumns]
               const taskToMove = newColumns[fromColumnIndex].tasks.splice(fromTaskIndex, 1)[0]
               newColumns[toColumnIndex].tasks.splice(toTaskIndexFallback, 0, taskToMove)

               return newColumns.map(column => {
                    const newTasks = column.tasks.filter(task => task !== undefined)
                    column.tasks = newTasks
                    return column
               })
          })
     }

     const moveColumnHandler = (fromColumnIndex, toColumnIndex) => {
          setColumns(prevColumns => {
               const newColumns = [...prevColumns]
               const temp = newColumns[toColumnIndex]
               newColumns[toColumnIndex] = newColumns[fromColumnIndex]
               newColumns[fromColumnIndex] = temp
               return newColumns
          })
     }

     const contextValue = {
          columns: columns,
          addTask: addTaskHandler,
          addColumn: addColumnHandler,
          moveTask: moveTaskHandler,
          moveColumn: moveColumnHandler
     }

     return (
          <BoardContext.Provider value={contextValue}>
               {children}
          </BoardContext.Provider>
     )
}