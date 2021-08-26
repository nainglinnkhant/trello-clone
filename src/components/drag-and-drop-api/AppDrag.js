const AppDrag = ({ children, transferData }) => {
     const dragStartHandler = (e) => {
          e.stopPropagation()
          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.dropEffect = 'move'

          e.dataTransfer.setData('payload', JSON.stringify(transferData))
     }

     return (
          <div 
               draggable
               onDragStart={dragStartHandler}
               onDragEnter={(e) => e.preventDefault()}
               onDragOver={(e) => e.preventDefault()}
          >
               {children}
          </div>
     )
}

export default AppDrag