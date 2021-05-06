import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense if id is not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should add expense', () => {
    const expense = {
        id: '4',
        description: 'Groceries',
        note: 'from publix',
        amount: 5000,
        createdAt: 2000
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense: expense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses.concat(expense))
})

test('should edit expense', () => {
    const description = 'Peruvian'
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[2].id,
        updates: {
            description: description
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state[2].description).toEqual(description)
})

test('should not edit expense if id not found', () => {
    const description = 'Peruvian'
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-4',
        updates: {
            description: description
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})