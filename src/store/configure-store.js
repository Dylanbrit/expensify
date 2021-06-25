import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )

    return store
}

// In oder to use our middleware for dispatching functions for firebase, we need to import applyMiddleware from redux
// applyMiddleware comes from redux and allows us to add middleware to our code
// We import thunk from redux-thunk- this is our middleware
// Since we already have our redux devtools as the second argument, we need to come up with a function that allows us to use both the devtools and thunk
// applyMiddleware takes an argument- the name of the middleware we are using- we get this from our thunk import
// composeEnhancers is a variable that equals one of two functions- our devtools or compose
// compose is a function that 
// First it checks if we are using the devtools. If we are not, then we are using compose