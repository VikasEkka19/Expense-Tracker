import { useContext } from 'react';

import ExpensesOutput from '../components/ExpensesOutput';
import { getDateMinusDays } from '../util/date';
import { ExpenseContext } from '../store/expenses-context';


function RecentExpenses () {
    const expensesCtx = useContext(ExpenseContext);

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