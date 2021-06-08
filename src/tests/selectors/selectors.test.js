import selectExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should return 0 if no expenses', () => {
    const action = selectExpensesTotal([])
    expect(action).toEqual(0)
})

test('should correctly add up a single expense', () => {
    const action = selectExpensesTotal([expenses[0]])
    expect(action).toEqual(195)
})

test('should correctly add up multiple expenses', () => {
    const action = selectExpensesTotal(expenses)
    expect(action).toEqual(114195)
})

// reduce() finds out the essence of the array as a whole and reduces it into one thing
// reduce() takes two arguments- an accumulator and a current value
// You give it something that will persist over time as it loops over every element of the array then you can act on the thing persisting and the actual value of the array

// let vals = [5, 4, 1, 2, 9]

// function sum(acc, val) {
//     return acc + val
// }

// const answer = vals.reduce(sum)
// console.log(answer)