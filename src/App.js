import { BoardProvider } from './context/BoardContext'
import Board from './pages/Board'

function App() {
     return (
          <BoardProvider>
               <Board />
          </BoardProvider>
     )
}

export default App
