import { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryPanel from './components/SummaryPanel';
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpense) => {
    setExpenses([{ ...newExpense, id: Date.now().toString() }, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="app-container animate-fade-in-up">
      <header className="header delay-1">
        <h1 className="gradient-text" style={{ paddingBottom: '0.2rem' }}>Expenses Tracking App</h1>
        <p>Track your spending with elegance and clarity.</p>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-col left-col delay-1">
          <SummaryPanel expenses={expenses} />
          <CurrencyConverter totalAmountUSD={totalAmount} />
        </div>

        <div className="dashboard-col middle-col delay-2">
          <ExpenseForm onAddExpense={addExpense} />
        </div>

        <div className="dashboard-col right-col delay-3">
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
        </div>
      </div>
    </div>
  );
}

export default App;
