import React, { useContext } from 'react'
import useLocalStorage from '../hooks/use-local-storage'
import { uuid, DEFAULT_BOARD } from '../default-board'

const BoardContext = React.createContext({
     columns: [],
     addTask: (changedColumn, task) => {},
     addColumn: (columnName) => {},
     moveTask: (fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex) => {},
     moveColumn: (fromColumnIndex, toColumnIndex) => {},
     deleteTask: (taskIndex, columnIndex) => {},
     deleteColumn: (columnIndex) => {}
})

export const useBoard = () => useContext(BoardContext)

export const BoardProvider = ({ children }) => {
     const [columns, setColumns] = useLocalStorage('board', DEFAULT_BOARD)

     const addTask = (changedColumn, task) => {
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

     const addColumn = (columnName) => {
          setColumns(prevColumns => {
               return prevColumns.concat({ id: uuid(), name: columnName, tasks: [] })
          })
     }

     const moveTask = (fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex) => {
          const toTaskIndexFallback = toTaskIndex !== null ? toTaskIndex : columns[toColumnIndex].tasks.length

          setColumns(prevColumns => {
               const newColumns = JSON.parse(JSON.stringify(prevColumns))

               const taskToMove = newColumns[fromColumnIndex].tasks.splice(fromTaskIndex, 1)[0]
               newColumns[toColumnIndex].tasks.splice(toTaskIndexFallback, 0, taskToMove)

               return newColumns
          })
     }

     const moveColumn = (fromColumnIndex, toColumnIndex) => {
          setColumns(prevColumns => {
               const newColumns = [...prevColumns]
               const temp = newColumns[toColumnIndex]
               newColumns[toColumnIndex] = newColumns[fromColumnIndex]
               newColumns[fromColumnIndex] = temp
               return newColumns
          })
     }

     const deleteTask = (taskIndex, columnIndex) => {
          setColumns(prevColumns => {
               const newColumns = JSON.parse(JSON.stringify(prevColumns))

               newColumns[columnIndex].tasks.splice(taskIndex, 1)
               return newColumns
          })
     }

     const deleteColumn = (columnIndex) => {
          setColumns(prevColumns => {
               const newColumns = [...prevColumns]

               newColumns.splice(columnIndex, 1)
               return newColumns
          })
     }

     const contextValue = {
          columns,
          addTask,
          addColumn,
          moveTask,
          moveColumn,
          deleteTask,
          deleteColumn
     }

     return (
          <BoardContext.Provider value={contextValue}>
               {children}
          </BoardContext.Provider>
     )
}