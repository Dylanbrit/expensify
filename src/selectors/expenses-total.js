// export default (expenses) => {
//     if (expenses.length === 0) {
//         return 0
//     } else {
//         return expenses.map((expense) => {
//             return expense.amount.reduce((sum, value) => {
//                 return sum + value
//             }, 0)
//         })
//     }
// }

export default (expenses) => {
    return expenses.map((expense) => expense.amount).reduce((sum, value) => sum + value, 0)
}

// const getExpensesTotal = (info) => {
//     const amounts = info.map((item) => {
//         return item.amount
//     })
//     return amounts.reduce(add)
// }

// const add = (a, b) => {
//     return a + b
// }

// const total = getExpensesTotal(expenses) // map and reduce
// console.log(total) // 114195