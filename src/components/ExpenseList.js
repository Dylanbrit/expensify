import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'

// The reason we are exporting this as an individual as well as connected to the store is because to test it we need to have the unconnected version
 export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>no expenses</p>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem expense={expense} key={expense.description} />
                })
            )
        }
        
    </div>
)

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
}

export default connect(mapStateToProps)(ExpenseList)

// mapStateToProps has access to the store, and when we connect it to ExpenseList, it provides whatever we return from mapStateToProps to ExpenseList
// We pass the props into ExpenseList as an argument, and then we can access what we need through props
// When we set up Provider in the root of our application, it allows us to define the store we want to provide to all of our components
// We create HOCs using the connect function from React-Redux
// We call connect and define the things we want to get off the store and the component we want to create the connected version of
// The end result is a brand new component, which is just our component with the props from the store