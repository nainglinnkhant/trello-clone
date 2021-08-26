import { useEffect, useState } from 'react'

const PREFIX = 'trello-clone-'

const useLocalStorage = (key, initialValue) => {
     const prefixedKey = PREFIX + key
     
     const [value, setValue] = useState(() => {
          const jsonData = localStorage.getItem(prefixedKey)

          if(jsonData !== null) return JSON.parse(jsonData)

          return initialValue
     })

     useEffect(() => {
          localStorage.setItem(prefixedKey, JSON.stringify(value))
     }, [prefixedKey, value])

     return [value, setValue]
}

export default useLocalStorage