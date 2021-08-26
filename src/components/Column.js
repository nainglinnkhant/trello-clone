import { useState } from 'react'
import TaskItem from './TaskItem'
import AppDrag from '../components/drag-and-drop-api/AppDrag'
import AppDrop from '../components/drag-and-drop-api/AppDrop'
import { useBoard } from '../context/BoardContext'
import styles from './Column.module.css'

const Column = ({ column, columnIndex }) => {
     const { addTask, moveTask, moveColumn } = useBoard()
     const [task, setTask] = useState('')

     const addNewTaskHandler = (e) => {
          e.preventDefault()

          addTask(column, task)
          setTask('')
     }

     const dropHandler = (transferData) => {
          if(transferData.type === 'task') {
               const fromTaskIndex = transferData.taskIndex
               const fromColumnIndex = transferData.columnIndex

               moveTask(fromTaskIndex, null, fromColumnIndex, columnIndex)
          } else {
               const fromColumnIndex = transferData.columnIndex
               moveColumn(fromColumnIndex, columnIndex)
          }
     }

     return (
          <AppDrop drop={dropHandler}>
               <AppDrag transferData={{ type: 'column', columnIndex }}>
                    <div className={`${styles.column} d-flex align-self-start flex-column shadow-sm`}>
                         <div className="fw-bold text-dark mb-1">{column.name}</div>
                         
                         {column.tasks.map((task, index) => (
                              <TaskItem 
                                   key={task.id} 
                                   task={task} 
                                   taskIndex={index}
                                   columnIndex={columnIndex}
                              />
                         ))}

                         <form onSubmit={addNewTaskHandler}>
                              <input
                                   type="text"
                                   className={`${styles.input} mt-1 py-2 px-2`} 
                                   placeholder="+ Add a new task" 
                                   value={task}
                                   onChange={(e) => setTask(e.target.value)}
                              />
                         </form>
                    </div>
               </AppDrag>
          </AppDrop>
     )
}

export default Column