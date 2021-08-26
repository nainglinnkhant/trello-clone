import Column from '../components/Column'
import NewColumnForm from '../components/NewColumnForm'
import { useBoard } from '../context/BoardContext'

const Board = () => {
     const { columns } = useBoard()

     return (
          <div className="d-flex flex-nowrap">
               {columns.map((column, index) => (
                    <Column key={column.id} column={column} columnIndex={index} />
               ))}

               <NewColumnForm />
          </div>
     )
}

export default Board