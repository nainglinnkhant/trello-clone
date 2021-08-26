const AppDrop = ({ children, drop }) => {
     const dropHandler = (e) => {
          e.stopPropagation()
          e.preventDefault()
          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.dropEffect = 'move'

          const transferData = JSON.parse(e.dataTransfer.getData('payload'))
          drop(transferData)
     }

     return (
          <div
               onDrop={dropHandler}
               onDragEnter={(e) => e.preventDefault()}
               onDragOver={(e) => e.preventDefault()}
          >
               {children}
          </div>
     )
}

export default AppDrop