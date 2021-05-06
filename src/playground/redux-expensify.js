import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// Expenses Reducer

const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => {
    return {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description: description,
            note: note,
            amount: amount,
            createdAt: createdAt
        }
    }
}

const removeExpense = ({ id }) => {
    return {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: id
        }
    }
}

const editExpense = (id, updates) => {
    return {
        type: 'EDIT_EXPENSE',
        id: id,
        updates: updates
    }
}

const setTextFilter = (text = '') => {
    return {
        type: 'SET_TEXT_FILTER',
        text: text
    }
}

const sortByAmount = () => {
    return {
        type: 'SORT_BY_AMOUNT'
    }
}

const sortByDate = () => {
    return {
        type: 'SORT_BY_DATE'
    }
}

const setStartDate = (startDate) => {
    return {
        type: 'SET_START_DATE',
        startDate: startDate
    }
}

const setEndDate = (endDate) => {
    return {
        type: 'SET_END_DATE',
        endDate: endDate
    }
}

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return state.concat(action.expense)
        case 'REMOVE_EXPENSE':
            return state.filter((expense) => {
                return expense.id !== action.expense.id
            })
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        default:
            return state
    }
}
// The reducer is where we set the state

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

// In the event the action type is trying to set the text filter, we return a new state object and use ...state to clone all the state info
// After bringing in the old state, we override the text by setting text: action.text
// action.text will be equal to whatever we set text equal to in our action generator, which is the argument passed in during the dispatch call
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
}

// Timestamps- any positive or negative integer value
// Counting starts in milliseconds based on the date of January 1, 1970 at midnight- the Unix Epoch

// Get Visible Expenses
// This function takes in our expenses and our filters so that we can use the filters to show our expenses
// We use .filter and we want to check our start and end date as well as our text filters to determine a match for all three
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        // For start and end date, we want to return a match if it is not a number, because it will be undefined if it's not a number
        // undefined is important to return as true because if the filter will be undefined if it isn't adjusted
        // Then we want to check to see where the createdAt date is compared to the start and end date to see if it fits inside the range
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
        // .sort allows us to call a function to determine the order we want to organize our info
        // We call it at the end of our filtered array because we want it to incorporate our filters into sorting
        // It takes in two arguments, a and b
        // We return -1 if 'a' should come first and we return 1 if 'b' should come first
        // We use conditional logic to determine what we will do depending on what sortBy is set to
        // If the sortBy is set to date, than we want to return the larger date number as the most recent expense
        // To do that we check if a is less than b, and if it is we return 1
        // If the sortBy is set to amount then we check if a is less than b and if it is we return b since we want the bigger number first
    })
}

// Store Creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

// We want to get the state, and then with that state call our getVisibleExpenses function and pass in our expenses and filters
// Now we will be able to see the effect that our filters have on our expenses
store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({ description: 'rent', amount: 95000, createdAt: -1000 }))
const expenseTwo = store.dispatch(addExpense({ description: 'beer', amount: 1000, createdAt: 1000 }))
// const expenseThree = store.dispatch(addExpense({ description: 'food', amount: 12000 }))
// store.dispatch(removeExpense({ id: expenseTwo.expense.id }))
// store.dispatch(editExpense(expenseOne.expense.id, { amount: 50000 }))
// store.dispatch(setTextFilter('rent'))
// store.dispatch(setTextFilter(''))
store.dispatch(sortByAmount())
// store.dispatch(sortByDate())
// store.dispatch(setStartDate(0))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(1250))

const demoState = {
    expenses: [{
        id: '12345',
        description: 'Dinner',
        note: 'This was the price of dinner at Ceviche 105',
        amount: 9000,
        createdAt: 0
    }],
    filters: {
        text: 'Dinner',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
}