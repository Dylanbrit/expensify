import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

// Export a stateless functional component that renders-
// description, amount, createdAt
const ExpenseListItem = (props) => {
    return (
        <div>
            <Link to={`/edit/${props.expense.id}`}><h3>{props.expense.description}</h3></Link>
            <p>{numeral(props.expense.amount / 100).format('$0,0.00')}, {props.expense.createdAt}, {moment(props.expense.createdAt).format('MMMM Do, YYYY')}</p>
        </div>
    )
}

// We want to be able to click on our item description on the home page and get redirected to the edit page
// So we import Link, wrap our <h3> inside of it, and set up the 'to' property to send the user to the edit page for the mathching id
// Since we have access to props that are passing down our expense object, we can access props.expense.id to inject into our template string

export default ExpenseListItem