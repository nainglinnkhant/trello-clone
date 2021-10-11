import { useState } from 'react'
import { useBoard } from '../context/BoardContext'
import styles from './NewColumnForm.module.css'

const NewColumnForm = () => {
     const { addColumn } = useBoard()
     const [columnName, setColumnName] = useState('')

     const addColumnHandler = (e) => {
          e.preventDefault()

          addColumn(columnName)
          setColumnName('')
     }

     return (
          <form onSubmit={addColumnHandler} className={`${styles.form} align-self-start d-flex`}>
               <input 
                    type="text" 
                    value={columnName} 
                    onChange={(e) => setColumnName(e.target.value)} 
                    className={`${styles.input} px-2 py-1 me-1`}
                    placeholder="New Column Name"
               />

               <button className={`${styles.button} rounded`}>+</button>
          </form>
     )
}

export default NewColumnForm