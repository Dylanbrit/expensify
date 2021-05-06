import React from 'react'
import { DateRangePicker } from 'react-dates'
import { connect } from 'react-redux'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters'

// Here is where we keep our input for the user to search via the text filter
// If we just set the value, it makes it immutable
// We need to set the value to our filter, but also add an onChange event handler
// We need to be able to change the state right inside the event handler, so that we aren't out of sync with the state and so our changes stay
// We need to use dispatch in here so that our keystrokes result in a change to the input
// We have access to dispatch from inside of our connected components so we can call it directly to dispatch actions
// When using react-redux and the connect function, the dispatch method is injected into the props for us so we use props.dispatch
// The connect function intercepts the props coming from the expense object and passes those along with dispatch into the component it wraps

const ExpenseListFilters = (props) => {
    return (
        <div>
            <input type="text" value={props.filters.text} onChange={(e) => {
                props.dispatch(setTextFilter(e.target.value))
            }} />
            <select value={props.filters.sortBy} onChange={(e) => {
                if (e.target.value === 'date') {
                    props.dispatch(sortByDate())
                } else if (e.target.value === 'amount') {
                    props.dispatch(sortByAmount())
                }
            }}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </select>
        </div>
    )
}
    
const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListFilters)