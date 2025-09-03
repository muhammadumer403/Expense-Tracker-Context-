import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ExpenseProvider } from './Context/ExpenseContext'

function App() {
  

  return (
    <ExpenseProvider>
      <div>
        Hello
      </div>
    </ExpenseProvider>
  )
}

export default App
