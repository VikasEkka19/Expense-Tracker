import { useContext, useEffect } from 'react';

import ExpensesOutput from '../components/ExpensesOutput';
import { getDateMinusDays } from '../util/date';
import { ExpenseContext } from '../store/expenses-context';
import { fetchExpense } from '../util/http';


function RecentExpenses () {
    const expensesCtx = useContext(ExpenseContext);

    useEffect(() => {
        async function  getExpense(){
           const expenses = await fetchExpense();
           expensesCtx.setExpenses(expenses);
        }

        getExpense();
    }, [])

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        
        return (expense.date >= date7DaysAgo) && (expense.date <= today);
    });

    return (
        <ExpensesOutput 
        expenses={recentExpenses} 
        expensesPeriod='Last 7 days'
        fallbackText='No expenses registered in last 7 days.'
         />
        )
}
export default RecentExpenses;