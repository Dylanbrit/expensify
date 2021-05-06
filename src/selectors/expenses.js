import moment from 'moment'

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        // For start and end date, we want to return a match if it is not a number, because it will be undefined if it's not a number
        // undefined is important to return as true because if the filter will be undefined if it isn't adjusted
        // Then we want to check to see where the createdAt date is compared to the start and end date to see if it fits inside the range
        // const createdAtMoment = moment(expense.createdAt)
        // const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
        // const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
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

export default getVisibleExpenses