import { useBoard } from "../context/BoardContext"
import AppDrag from "./drag-and-drop-api/AppDrag"
import AppDrop from "./drag-and-drop-api/AppDrop"

const TaskItem = ({ task, taskIndex, columnIndex }) => {
     const { moveTask, moveColumn } = useBoard()

     const dropHandler = (transferData) => {
          if(transferData.type === 'task') {
               const fromTaskIndex = transferData.taskIndex
               const fromColumnIndex = transferData.columnIndex

               moveTask(fromTaskIndex, taskIndex, fromColumnIndex, columnIndex)
          } else {
               const fromColumnIndex = transferData.columnIndex
               moveColumn(fromColumnIndex, columnIndex)
          }
     }

     return (
          <div 
               className="bg-white py-2 my-1 px-2 rounded text-dark fw-bold shadow-sm"
          >
               <AppDrop drop={dropHandler}>
                    <AppDrag transferData={{ type: 'task', taskIndex, columnIndex }}>
                         {task.name}
                    </AppDrag>
               </AppDrop>
          </div>
     )
}

export default TaskItem