import axios from "axios";

export function storeExpense (expenseData) {
    axios.post('https://expense-tracker-d27c0-default-rtdb.firebaseio.com/expenses.json',
    expenseData
    ).then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
