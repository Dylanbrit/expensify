import React from 'react'
import { connect } from 'react-redux'
import selectExpensesTotal from '../selectors/expenses-total'
import getVisibleExpenses from '../selectors/expenses'

const ExpensesSummary = (props) => {
    const expenseWord = props.expenseCount === 1 ? 'expense' : 'expenses'
    return (
        <div>
            <h1>Viewing {props.expenseCount} {expenseWord} totalling ${props.expensesTotal}</h1>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary)

// We are using this component to display a summary of the items on the list
// Since we are using data from the store to determine the number of items and their total, we need to use connect
// Once we import react and connect, we set up the stateless functional component
// When we use connect(), we connect our component with the redux store
// What is returned inside of mapStateToProps is an object that contains info from the redux store that we can use through the props in our component