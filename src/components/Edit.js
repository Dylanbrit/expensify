import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { editExpense, removeExpense } from '../actions/expenses'

const EditExpensePage = (props) => {
    return (
        <div>
            <ExpenseForm expense={props.expense}
                onSubmit={(expense) => {
                    props.dispatch(editExpense(props.expense.id, expense))
                    props.history.push('/')
                }} />
                <button onClick={((e) => {
                    props.dispatch(removeExpense({ id: props.expense.id }))
                    props.history.push('/')
                })}>Remove</button>
        </div>
    )
}

// Our removeExpense action generator requires the id of the expense we want to remove, and we can access that through props.expense.id
// mapStateToProps gives the matching expense from the store to the props for EditExpensePage, then those props are passed into expense, then those are passed in wherever we need them

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id
        })
    }
}

// The reason we use mapStateToProps in connect() here is because in order to edit something, we need to know it's existing value
// We want the user to see the info that is currently in the store for the item they selected
// We update the store when we add items to it, so by checking the store we can grab that info to show the user which item they are editing
// Inside mapStateToProps, we want to grab the current expense object from the store
// mapStateToProps accesses the state as its first argument, and then we have access to the props as the second argument
// So we return a new object with the expenses array set to state.expenses.find(), where we see if the id of the individual expense matches props.match.params.id, which will be the page we want to go to
// If props.match.params.id matches the individual expense.id, then we have a match and that's the one we want to work with, so we take that object and put it on the expense object
// Now that we have the actual expense accessible to us, we can render ExpenseForm in EditExpensePage
// Once EditExpensePage is connected to the store and we have a match, we can pass it in through props in the argument of EditExpensePage
// Now that we have access to it through the props, we can set an expense property up to pass the current expense object down to ExpenseForm
// Using this info, ExpenseForm can gather the info from the current expense object to fill in the existing values
// We also set up onSubmit
// The argument for our function is the expense object that contains our matching expense
// Once we enter in new information, the editExpense action generator gets dispatched with the id of the expense we want to edit, as well as the expense object that contains all of our updates
// Then we redirect to the home page, where we will see our changes to the expense rendered

export default connect(mapStateToProps)(EditExpensePage)