import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.handlePick = this.handlePick.bind(this)
        this.removeAll = this.removeAll.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.removeOne = this.removeOne.bind(this)
        this.getTotalCals = this.getTotalCals.bind(this)
        this.captureCals = this.captureCals.bind(this)
        this.state = {
            options: [],
            calories: [parseInt(0, 10)],
            currentCals: undefined
        }
    }
    handlePick() {
        const num = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[num]
        alert(option)
    }
    removeAll() {
        this.setState((previousState) => {
            return {
                options: [],
                calories: [parseInt(0, 10)]
            }
        })
    }
    removeOne(optionText, optionCalories) {
        console.log(optionText, optionCalories)
        this.setState((previousState) => {
            return {
                options: previousState.options.filter((option) => {
                    if (optionText !== option) {
                        return option
                    }
                }),
                calories: previousState.calories - optionCalories
            }
        })
    }
    handleAdd(inputText, inputCalories) {
        if (inputText, inputCalories) {
            this.setState((previousState) => {
                return {
                    options: previousState.options.concat(inputText),
                    calories: parseInt(previousState.calories, 10) + parseInt(inputCalories, 10)
                }
            })
        }
    }
    captureCals(calories) {
        this.setState(() => {
            return {
                currentCals: calories
            }
        })
    }
    getTotalCals() {
        return parseInt(this.state.calories, 10)
    }
    componentDidMount() {
        // add a way to pull calories from localStorage
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)

            if (options) {
                this.setState(() => {
                    return {
                        options: options
                    }
                })
            }
        } catch (e) {
            // Do nothing
        }
    }
    componentDidUpdate(previousProps, previousState) {
        // add a way to store calories in localStorage
        if (previousState.options.length !== this.state.options.length) {
            const data = JSON.stringify(this.state.options)
            localStorage.setItem('options', data)
        }
    }
    render() {
        const title = 'Log Your Meals!'

        return (
            <div>
                <Header title={title} />
                <Actions handlePick={this.handlePick} removeAll={this.removeAll} />
                <Options options={this.state.options} calories={this.state.calories} currentCals={this.state.currentCals} removeOne={this.removeOne} captureCals={this.captureCals} />
                <AddOptions handleAdd={this.handleAdd} captureCals={this.captureCals} />
                <TotalCalories calories={this.state.calories} getTotalCals={this.getTotalCals} />
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
            </div>
        )
    }
}

class Actions extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handlePick}>Pick One!</button>
                <button onClick={this.props.removeAll}>Remove All</button>
            </div>
        )
    }
}

class Options extends React.Component {
    render() {
        return (
            <div>
                {this.props.options.map((item) => {
                    return <Option key={item} optionText={item} calories={this.props.captureCals} currentCals={this.props.currentCals} removeOne={this.props.removeOne} />
                })}
            </div>
        )
    }
}

class Option extends React.Component {
    render() {
        console.log(this.props.currentCals)
        return (
            <div style={{marginTop: "20px"}}>
                {this.props.optionText}
                <input type="text" style={{width: "10px"}, {marginLeft: "10px"}} />
                <button style={{marginLeft: "15px"}} onClick={() => {
                    this.props.removeOne(this.props.optionText, this.props.currentCals)
                }}>Remove</button>
            </div>
        )
    }
    // this.props.calories() was second argument
}

class AddOptions extends React.Component {
    constructor(props) {
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
    }
    handleAdd(e) {
        const input = e.target.text.value
        const calories = e.target.cals.value
        this.props.captureCals(calories)
        this.props.handleAdd(input, calories)

        e.target.text.value = ''

        e.preventDefault()
    }
    // captureCals(calories) {
    //     this.props.captureCals(calories)
    // }
    render() {
        return (
            <div>
                <h3>Add a New Meal Below</h3>
                <form style={{marginTop: "20px"}} onSubmit={(e) => {
                    this.handleAdd(e)
                }}>
                    <input type="text" name="text" placeholder="Enter meal name here" />
                    <input type="number" name="cals" placeholder="Enter calories here" />
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

class TotalCalories extends React.Component {
    render() {
        return (
            <div>
                <h2>Total Calories: {this.props.getTotalCals()}</h2>
            </div>
        )
    }
}

const app = document.querySelector('#app')
ReactDOM.render(<App />, app)