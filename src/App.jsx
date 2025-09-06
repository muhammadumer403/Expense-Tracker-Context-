import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ExpenseProvider, useTracker } from './Context/ExpenseContext'

function AppContent() {
  const [Details, setDetails] = useState("")
  const [type, setType] = useState("Income")
  const [Amount, setAmount] = useState(0)

  const { AddTransaction, calculateBalance, Transaction, Balance } = useTracker();

  useEffect(() => {
    calculateBalance();
  }, [Transaction]);

  const sumbitHandler = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      Details,
      Amount: Number(Amount),
      type,
    };

    AddTransaction(newTransaction);

    setDetails("");
    setAmount(0);
    setType("Income");
  };

  return (
    <>
      <h1>Balance: RS {Balance}</h1>
      <div>
        <input
          type="text"
          placeholder="Transaction Details(optional)"
          value={Details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <input
          type="number"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <button onClick={sumbitHandler}>Add</button>
      </div>
      <div>
        {Transaction.map((st) => (
          <div key={st.id}>
            <h6>{st.type}</h6>
            <h6>{st.Amount}</h6>
            <h6>{st.Details}</h6>
          </div>
        ))}
      </div>
    </>
  );
}

function App() {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  );
}

export default App;
