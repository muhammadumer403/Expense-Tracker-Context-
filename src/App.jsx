import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ExpenseProvider } from './Context/ExpenseContext'

function App() {
  const [Transaction, setTransaction] = useState([])
  const [Details, setDetails] = useState("")
  const [type, setType] = useState("Income")
  const [Amount, setAmount] = useState(0)
  const[Balance,setBalance]=useState(0)

  const sumbitHandler = (e)=>{
    e.preventDefault()

    const newTransaction = {
      id:Date.now(),
      Details,
      Amount:Number(Amount),
      type,}

      setTransaction(prev=>[...prev,newTransaction]);
      if(type==="Income"){
        setBalance(Balance+Number(Amount))
      }
      else{
        setBalance(Balance-Number(Amount))
      }

      setDetails("");
      setAmount(0);
      setType("Income");
      console.log(Transaction);




    
    
  }

  return (
    <ExpenseProvider>
      <>
        <h1>Balance:RS{Balance}</h1>
        <div>
          <input type="text" placeholder='Transaction Details(optional)' value={Details} onChange={(e)=>setDetails(e.target.value)} />
          <input type="number" value={Amount} onChange={(e)=>setAmount(e.target.value)}  />
          <select value={type} id="" onChange={(e)=>setType(e.target.value)} >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <button onClick={sumbitHandler}>Add </button>
        </div>
        <div>
          {Transaction.map((st)=>(
            <div>
               <h6>{st.type}</h6>
          <h6>{st.Amount}</h6>
          <h6>{st.Details}</h6>

            </div>
           
          ))}
        
      </div> </>
    </ExpenseProvider>
  )
}

export default App
