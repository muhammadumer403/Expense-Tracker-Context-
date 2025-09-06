import { createContext, useContext } from "react";

const ExpenseContext = createContext()

export const ExpenseProvider = ({children})=>{
    const [Transaction,setTransaction] = useState([])
    const getTransaction = ()=>{
        const data = localStorage.getItem("transactions")
        if(data){
            setTransaction(JSON.parse(data))
        }}

    const setTransactions =(data)=>{
        localStorage.setItem("transactions",JSON.stringify(data))
        setTransaction(data)
    }

    const AddTransaction = (Details,Amount,type)=>{
        const newTransaction = {
            id:Date.now(),
            Details,
            Amount:Number(Amount),
            type,
          }

          setTransaction(prev=>[...prev,newTransaction])
          setTransactions([...Transaction,newTransaction])


    }
    const deleteTransaction =(id)=>{
        const updatedTransactions = Transaction.filter(t=>t.id !== id)
        setTransactions(updatedTransactions)
        setTransaction(updatedTransactions)
    }

    const EditTransaction =(id,Details,Amount,type)=>{
        const updatedTransaction = Transaction.map(t=>t.id === id ? {...t,Details,Amount,type} : t)
        setTransactions(updatedTransaction)
        setTransaction(updatedTransaction)
    }
    const calculateBalance =()=>{
        let balance = 0
        Transaction.forEach(t=>{
            if(t.type === "Income"){
                balance += t.Amount;
            }
            if(t.type === "Expense"){
                balance -= t.Amount;
            }
            return balance;
        })
    }




    return(
    <ExpenseContext.Provider value={{AddTransaction,Transaction,deleteTransaction,EditTransaction,getTransaction,calculateBalance}}>
        {children}
    </ExpenseContext.Provider>)
}
 export const useTracker = () => useContext(ExpenseContext)