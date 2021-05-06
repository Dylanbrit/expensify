import { createStore } from 'redux'

const incrementCount = ({ incrementBy = 1 } = {}) => {
    return {
        type: 'INCREMENT',
        incrementBy: incrementBy
    }
}

const decrementCount = ({ decrementBy = 1} = {}) => {
    return {
        type: 'DECREMENT',
        decrementBy: decrementBy
    }
}

const setCount = ({ count } = {}) => {
    return {
        type: 'SET',
        count: count
    }
}

const resetCount = () => {
    return {
        type: 'RESET'
    }
}

const countReducer = ((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default: 
            return state
    }
}) 

const store = createStore(countReducer)

const unsub = store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(incrementCount())

store.dispatch(decrementCount())

store.dispatch(decrementCount({ decrementBy: 10 }))

store.dispatch(setCount({ count: 101 }))

store.dispatch(resetCount())

store.dispatch(setCount({ count: 1012 }))

store.dispatch(resetCount())

// const incrementCount = ({ incrementBy = 1 } = {}) => {
//     return {
//         type: 'INCREMENT',
//         incrementBy: incrementBy
//     }
// }

// const decrementCount = ({ decrementBy = 1 } = {}) => {
//     return {
//         type: 'DECREMENT',
//         decrementBy: decrementBy
//     }
// }

// const store = createStore((state = { count: 0 }, action) => {
//     switch (action.type) {
//         case 'INCREMENT':
//         return {
//             count: state.count + action.incrementBy
//         }
//         case 'DECREMENT':
//         return {
//             count: state.count - action.decrementBy
//         }
//         default:
//             return state
//     }
// })

// const unsub = store.subscribe(() => {
//     console.log(store.getState())
// })

// store.dispatch(incrementCount({ incrementBy: 10 }))
// store.dispatch(decrementCount({ decrementBy: 7 }))