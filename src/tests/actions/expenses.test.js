import { addExpense, removeExpense, editExpense } from '../../actions/expenses'

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        expense: {
            id: '123'
        }
    })
})

test('should setup edit expense action object', () => {
    const action = editExpense('12345', { note: 'new note value' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '12345',
        updates: {
            note: 'new note value'
        }
    })
})

test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 105000,
        createdAt: 1000,
        note: 'for rent'
    }
    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})

test('should setup add expense action object with default values', () => {
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            amount: 0,
            createdAt: 0,
            note: ''
        }
    })
})