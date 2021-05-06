import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
// import 'react-dates/lib/css/_datepicker.css'

// const now = moment()
// console.log(now.format("dddd, MMM Do, YYYY- h:mm:ss a"))
// console.log(SingleDatePicker)

// In our stateless functional components (const func = (props) => { return foo}), we are able to define our props in the function argument
// For our class components that handle state, we do not have a function argument to pass our props into
// So in order to get access to the props being passed down into ExpenseForm from Edit, we need to set up a constructor function and pass the props into super
// This will now give us access to the props we passed into ExpenseForm when ExpenseForm was called in Edit.js
// With access to these props, we can access the matching expense to populate the fields with the correct data
// The other option, as opposed to using the constructor, would be to switch everything in the state to this.props.expense
export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }
// Instead of using empty strings, we want to set up our state to view the current values for our expense we are looking at
// This will need some conditional logic
// To do this, we need to set up a single prop that gets passed into ExpenseForm that is optional
// If it exists, we will use the values from that expense as the default ones and if not we will stick to ''
// Again, for amount and createdAt, we need to do a little reformatting since amount exists sometimes as a string and sometimes as a number and createdAt uses moment() which doesn't check anything other than the immediate present
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => {
            return {
                description: description,
            }
        })
    }
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => {
            return {
                note: note
            }
        })
    }
    onAmountChange = (e) => {
        const amount = e.target.value

        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => {
                return {
                    amount: amount
                }
            })
        }
    }
    onDateChange = (createdAt) => {
        this.setState(() => {
            return {
                createdAt: createdAt
            }
        })
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => {
            return {
                calendarFocused: focused
            }
        })
    }
    onSubmit = (e) => {
        e.preventDefault()

        if (!this.state.description || !this.state.amount) {
            this.setState(() => {
                return {
                    error: 'Please provide description and amount'
                }
            })
        } else {
            this.setState(() => {
                return {
                    error: ''
                }
            })
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                note: this.state.note
            })
            // onSubmit is passed down through props when <ExpenseForm /> is called in Add.js
            // onSubmit is passed down through props, so we access it through this.props.onSubmit
            // This way we can pass our data up to be handled in Add.js- this will keep everything in ExpenseForm reusable
            // Here, when we call it, we are telling the HOC what info we want the function to be ran with as the argument for the function
            // We want an object, so we pass in our object with all of our properties set up
            // We set up description and note to dispatch with whatever the current local state is for description, as that will be what the user entered
            // We will usually have to reformat amount whenever we use it because it keeps going from a string to a number and changing whether it has a decimal point or not
            // The rest of the work- dispatching and redirecting the user- occurs in Add.js
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Description" autoFocus value={this.state.description} onChange={this.onDescriptionChange} />
                    <input type="text" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange} />
                    <SingleDatePicker date={this.state.createdAt} onDateChange={this.onDateChange} focused={this.state.calendarFocused} onFocusChange={this.onFocusChange} />
                    <textarea placeholder="Add a note for your expense (optional)" value={this.state.note} onChange={this.onNoteChange} ></textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
        // We don't dispatch the action in here, because this is meant to be reused
        // Adding or editing dispatches different stuff
        // We are going to pass the data up, this will allow us to determine what to do with the data when the user submits a form on a dynamic basis
    }
}
//
// onSubmit
//
// The argument passed into onSubmit is the e argument, so we can call e.preventDefault() to avoid full page refresh- do this on EVERY form!
// We use conditional validation to make sure there is input for description and amount, and if there is we let it submit
// If there is no input for either description or amount, we render an error to the screen
// To do this, we set up an error property for our local state, and we set the error state if there isn't proper input
// If there is proper input, we set error state blank
// To render a possible error, we can use the ternary operator to check to see if there is a value for this.state.error
// If there is a value for this.state.error, then we want to display it
// If this error gets fixed or if the user did everything right, then there is no error so the <p> won't show up

// state manager
//
// autoFocus makes it so that when we visit the page it automatically puts the cursor and the focus right on that input
// For this component, we are going to use local component state to track the inputs, so we are using the class based syntax extending from React.Component
// If we need to use state, then we must use a class
// Pretty muc any component with a form in it will be a class-based component
// Only when the user actually submits the form will we do something with that information
// We're gonna keep track of changes to every input, when they submit the form we'll send it off to redux to edit the existing expense or create a new one
// When we set the value inside of the description input, we make that field immutable
// To fix this, we set an onChange handler so that a function is called that updates the local state with the user input
// When we call our handler function, it takes in the event, so we can capture the value of the user's input inside the function
// The local state will hold all of our properties we are going to add for each note
// We are going to handle amount a little differently than description and notes
// For description and notes the user can type in whatever they want, but for amount we want to limit the user to just numbers with decimal options
// Instead of just blindly taking in the input for amount, we are gonna use conditional logic in our onChange handler
// We also want to limit the user to just two numbers after a decimal point, since this is handling currency
// To do this, we switch the input type to text instead of number and add our own validation in
// We use a regular expression to set the parameters for what we want to allow the user to enter
// If the user's input matches those parameters, we allow them to continue
// Use regex101.com to build regular expressions and get explanations for the characters involved
// regex101.com will also tell us if our regular expression is a match to our test string
// We check to see if our regular expresssion matches the amount the user entered by using .match()

// moment()
//
// Cataloging time and setting up the date picker
// For this we are going to use moment.js
// This is a time library, so it makes it easy to work with, manipulate, and format time

// SingleDatePicker
//
// SingleDatePicker is a component that allows user to select a single date
// date is set to this.state.date, which is set to a moment object that represents where we want to start, so when the user loads the page that will be the starting point
// onDateChange is a handler for when the user picks a new date, it changes the createdAt prop
// focused checks if the input is focused, we set it to false and store it in the state, and then change it with onFocusChange
// onFocusChange is an event handler for when the react-dates library needs to change the focus value
// The first argument of onFocusChange is a destructure argument with the focused property passed in