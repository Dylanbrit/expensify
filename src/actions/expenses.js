import uuid from 'uuid'
import database from '../firebase/firebase'

// Steps for normal action generators-
// component calls action generator
// action generator returns object
// component dispatches object
// redux store runs the reducers and changes

// Steps for asynchronous action generators (like when we are adding to, editing on, or removing from a database)-
// component calls action generator (stays the same)
// action generator returns function
// component dispatches function
// function runs (has the ability to dispatch other actions and do whatever it wants)
// redux does not support dispatching functions- we need to set up Module (a middleware that adds support for this behavior)

export const addExpense = (expense) => {
    return {
        type: 'ADD_EXPENSE',
        expense: expense
    }
}

// By using redux thunk we are going to be able to create asynchronous actions
// They do something asynchronous first, like writing to firebase, then they use dispatch to change the redux store
// this dispatches addexpense inside our function, and that changes the store
// we return a function inside this, which only works because we set up the middleware for thunk
// this gets called internally by redux, and it gets called with dispatch, giving us access inside the function
//!!!!!  we are writing some data to firebase waiting for that data to sync, then using dispatch to dispatch addexpense !!!!!
// for out main argument, we want to access expensedata, and if it isnt there we want an empty object
// For our argument for startAddExpense, we either want to intake the expenseData provided by the user, or an empty object if no data is provided
// We return a function that has access to dispatch
// Inside here, we create a const that recreates the expense with the values(and any default values) that we received from destructuring the object
// Basically, we are creating variables that hold the data passed in
// It's the same as writing this-
// const startAddExpense = (expenseData || {}) => {
//     const dispatchFunc = (dispatch) => {
//         const {
//             description = expenseData.description || '',
//             note = expenseData.note || '',
//             amount = expenseData.amount || '',
//             createdAt = expenseData.createdAt || moment().valueOf()
//         }
//     }
// }
// We destructure this so that we can assign the values to an object and push them to firebase

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData
        
        const expense = { description, note, amount, createdAt }
        
        return database.ref('notes').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        })
    }
}

export const removeExpense = ({ id }) => {
    return {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: id
        }
    }
}

export const editExpense = (id, updates) => {
    return {
        type: 'EDIT_EXPENSE',
        id: id,
        updates: updates
    }
}

// When we want to incorporate our database communications into our code, we need to do it in our actions
// We don't want our components to be concerned with where information is coming from and where it's going- a component's concern is presenting data
// AddExpense is what will have an object dispatch and will actually change the redux store
// redux-thunk has access to dispatch and getState
// startAddExpense is going to start that process off- it will dispatch AddExpense inside the function we set up and that is what keeps changing the store
// We return a function we define inline- this works due to us setting up redux thunk
// This function gets called internally by redux and it gets called with dispatch as its argument
// Now we have access to dispatch so we can use it inside of there once we are done doing whatever it is we're doing inside the function
// What we are doing inside the function is writing some data to firebase, waiting for the data to sync, then we use dispatch for addExpense making sure the redux store reflects those changes
// We are trying to push an object into firebase, so we make a const that holds our object with our data properties
// When the function runs, we take all the data and get our defaults, then save the data to firebase
// Then we dispatch the action, which changes the redux store
// When we call addExpense, it expects all the data passed in- the object we created called expenseData
// We end up getting rid of uuid because when we push to firebase an id is generated for us
// Now we can get rid of the defaults in our addExpense function setup and just call it expense, since the object is staged inside startAddExpense
// When we run the dispatch for addExpense, we give it the id equal to the ref key
// Then we spread out the rest of the expense object, so that the values for that are whatever was provided for the expense object
// The key property provided by firebase contains the id provided by firebase