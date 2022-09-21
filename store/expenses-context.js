import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {}
});

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A  pair of shoes',
        amount: 59.99,
        date: new Date('2022-12-19')
    },
    {
        id: 'e2',
        description: 'A  pair of trousers',
        amount: 19.99,
        date: new Date('2022-11-18')
    },
    {
        id: 'e3',
        description: 'some bananas',
        amount: 5.99,
        date: new Date('2022-02-05')
    },
    {
        id: 'e4',
        description: 'Books',
        amount: 19.99,
        date: new Date('2022-09-19')
    },
    {
        id: 'e5',
        description: 'bags',
        amount: 39.99,
        date: new Date('2022-04-03')
    }
]

function expenseReducer(state, action) {
    switch(action.type) {
        case 'ADD': 
        const id = new Date().toString() + Math.random.toString() ;
        return [{ ...action.payload, id: id}, ...state];

        case 'UPDATE':
        const updatableExpenseIndex = state.findIndex(
            (expense) => expense.id === action.payload.id
        );
        const updatableExpense = state[updatableExpenseIndex];
        const updatedItem = { ...updatableExpense, ...action.payload.data };
        const updatedExpenses = [...state];
        updatedExpenses[updatableExpenseIndex] = updatedItem;
        return updatedExpenses;

        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)

        default:
        return state;
    }
}

function ExpenseContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);  

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData) {
        dispatch ({ type: 'UPDATE', payload: {id : id, data: expenseData}});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense
    };

    return <ExpenseContext.Provider value={value}>
        {children}
        </ExpenseContext.Provider>
}

export default ExpenseContextProvider;