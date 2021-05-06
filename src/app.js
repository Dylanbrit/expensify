import React from 'react'
import ReactDOM from 'react-dom'
// import './styles/styles.scss'
import { Provider } from 'react-redux'
// Provider allows us to provide the store to all of the components that make up our app, so we don't have to pass the store around
import AppRouter from './routes/AppRouter'
import configureStore from './store/configure-store'
import { addExpense } from './actions/expenses'
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'

const store = configureStore()

store.dispatch(addExpense({ description: 'water bill', amount: 50, createdAt: 1000 }))
store.dispatch(addExpense({ description: 'gas bill', createdAt: 10000 }))
store.dispatch(addExpense({ description: 'rent', amount: 109500 }))

const state = store.getState()
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
console.log(visibleExpenses)

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

// To connect everything, we take <AppRouter/> out of our render method that starts everything up, and instead put <AppRouter/> inside a jsx variable where we connect <Provider/>
// With AppRouter inside of Provider, everything now has access to the redux store

const app = document.querySelector('#app')
ReactDOM.render(jsx, app)


// To get tests to pass, comment out the REMOVE_EXPENSE case in reducers->expenses, and startDateMatch/endDateMatch in selectors->expenses