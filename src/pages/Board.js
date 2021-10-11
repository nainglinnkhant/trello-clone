import AppDrop from '../components/drag-and-drop-api/AppDrop'
import Column from '../components/Column'
import NewColumnForm from '../components/NewColumnForm'
import { useBoard } from '../context/BoardContext'
import styles from './Board.module.css'

const Board = () => {
     const { columns, deleteTask, deleteColumn } = useBoard()

     const deleteHandler = (transferData) => {
          if(transferData.type === 'task') {
               const { taskIndex, columnIndex } = transferData 
               deleteTask(taskIndex, columnIndex)
          } else {
               const { columnIndex } = transferData
               deleteColumn(columnIndex)
          }
     }

     return (
          <>
               <div className="d-flex flex-nowrap">
                    {columns.map((column, index) => (
                         <Column key={column.id} column={column} columnIndex={index} />
                    ))}

                    <NewColumnForm />
               </div>

               <AppDrop drop={deleteHandler}>
                    <div className={styles["delete-zone"]}>
                         <p className="mb-0">Drag here to delete</p>
                    </div>
               </AppDrop>
          </>
     )
}

export default Board