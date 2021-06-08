import React from 'react'
import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'
import ExpenseListItem from './ExpenseListItem'
import ExpensesSummary from './ExpensesSummary'

const Home = () => (
    <div>
        <ExpensesSummary />
        <ExpenseListFilters />
        <ExpenseList />
    </div>
)

export default Home