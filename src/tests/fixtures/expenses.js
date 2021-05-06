import moment from 'moment'

const expenses = [{
    id: '1',
    description: 'Beer',
    note: '',
    amount: 1000,
    createdAt: 0
}, {
    id: '2',
    description: 'Gas',
    note: '',
    amount: 2500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Dinner',
    note: '',
    amount: 2000,
    createdAt: moment(0).add(4, 'days').valueOf()
}]

export default expenses