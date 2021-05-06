import React from 'react'
import ExpenseForm from './ExpenseForm'
import { connect } from 'react-redux'
import { addExpense } from '../actions/expenses'

const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={(expense) => {
            props.dispatch(addExpense(expense))
            props.history.push('/')
        }} />
    </div>
)

// We provide a single prop, a function on submit called onSubmit
// This gets called when a form gets submitted with valid data, and we get that data back in the form of the expense object
// This expense object will have all of the data from the expense object- description, amount, note, createdAt
// We set up onSubmit as a function prop we can pass down to our ExpenseForm
// IMPORTANT- in order to pass props along, we need to add props in as the argument for our component that is going to be passing props down
// This page needs to dispatch the given action to the redux store, which means we need to import and use connect()
// Since we are just adding and not reading from the store, we don't need to use mapStateToProps to access existing data in the store
// We get dispatch off of the props, and after we import the addExpense action generator, we can dispatch it with our expense object as the argument
// Remember, that expense object passed in is passed up from ExpenseForm, where everything the user entered in the fields was saved to local state and then passed in
// The components we render inside or React-router get access to a bunch of special props, among them is the history method
// Using props.history.push, we can redirect the user after they submit, and we want to send them to the home page
export default connect()(AddExpensePage)