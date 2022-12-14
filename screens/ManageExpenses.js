import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import { GlobalStyles } from '../constants/style';
import IconButton from '../components/UI/IconButton';
import { ExpenseContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpenses, deleteExpense } from '../util/http';

function ManageExpenses ({ route, navigation }) {
    const expensesCtx = useContext(ExpenseContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
    )

useLayoutEffect(() => {
    navigation.setOptions({
        title: isEditing ? 'Edit Expense' : 'Add Expense',
    }, [ navigation, isEditing]);
})
 async function deleteExpenseHandler () {
    await deleteExpense( editedExpenseId );
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack();
 };

 function cancelHandler () {
    navigation.goBack();
 };

     
 async function confirmHandler (expenseData) {
    try { if(isEditing) {
        expensesCtx.updateExpense(editedExpenseId,expenseData);
       let x= await updateExpenses( editedExpenseId, expenseData);
    } else {
       const id = await storeExpense(expenseData); 
        expensesCtx.addExpense({...expenseData, id: id})
    }
    navigation.goBack(); 
  } catch (error) {
    console.log(error);
  }
 };

    return (
        <View style={styles.container}>
            <ExpenseForm 
            onSubmit={confirmHandler}
            submitButtonLabel={isEditing ? 'Update' : 'Add'}
            onCancel={cancelHandler} 
            defaultValues={selectedExpense}
            />
            {isEditing && 
            <View style={styles.deleteContainer}>
                <IconButton 
                icon='trash' 
                color={GlobalStyles.colors.error500} 
                size={36} 
                onPress={deleteExpenseHandler} />
            </View>}
        </View>
    )
}
export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})