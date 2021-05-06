import React from 'react'
import ReactDOM from 'react-dom'

class Pokemon extends React.Component {
    constructor(props) {
        super(props)
        this.addOption = this.addOption.bind(this)
        this.addToTeam = this.addToTeam.bind(this)
        this.remove = this.remove.bind(this)
        this.removeFromTeam = this.removeFromTeam.bind(this)
        this.state = {
            options: [],
            myTeam: []
        }
    }
    addOption(e) {
        const name = e.target.elements.text.value
        
        // if (this.state.options.indexOf(name) < 0) {
        //     this.setState((previousState) => {
        //         return {
        //             options: previousState.options.concat(name)
        //         }
        //     })
        // } else {
        //     return 'Please enter a new item'
        // }
        this.setState((previousState) => {
            return {
                options: previousState.options.concat(name)
            }
        })

        e.target.elements.text.value = ''

        e.preventDefault()
    }
    addToTeam(item) {
        this.setState((previousState) => {
            return {
                options: previousState.options.filter((option) => {
                    if (item !== option) {
                        return option
                    }
                }),
                myTeam: previousState.myTeam.concat(item)
            }
        })
    }
    remove(item) {
        this.setState((previousState) => {
            return {
                options: previousState.options.filter((option) => {
                    if (item !== option) {
                        return option
                    }
                })
            }
        })
    }
    removeFromTeam(name) {
        this.setState((previousState) => {
            return {
                options: previousState.options.concat(name),
                myTeam: previousState.myTeam.filter((item) => {
                    if (name !== item) {
                        return item
                    }
                })
            }
        })
    }
    componentDidUpdate(previousProps, previousState) {
        if (previousState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
        if (previousState.myTeam.length !== this.state.myTeam.length) {
            const json2 = JSON.stringify(this.state.myTeam)
            localStorage.setItem('myTeam', json2)
        }
    }
    componentDidMount() {
        try {
            const data = localStorage.getItem('options')
            const options = JSON.parse(data)
            if (options) {
                this.setState(() => {
                    return {
                        options: options
                    }
                })
            }
            const data2 = localStorage.getItem('myTeam')
            const options2 = JSON.parse(data2)
            if (options2) {
                this.setState(() => {
                    return {
                        myTeam: options2
                    }
                })
            }
        } catch (e) {
            // Do nothing
        }
    }
    render() {
        return (
            <div>
                <Header />
                <Add addOption={this.addOption} />
                <Options options={this.state.options} addToTeam={this.addToTeam} remove={this.remove} />
                <MyTeam myTeam={this.state.myTeam} removeFromTeam={this.removeFromTeam} />
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Pokemon Team</h1>
                <h2>Start your own Pokemon team!</h2>
            </div>
        )
    }
}

class Add extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={(e) => {
                    this.props.addOption(e)
                }}>
                    <input type="text" name="text" />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

class Options extends React.Component {
    render() {
        return (
            <div>
                {this.props.options && this.props.options.map((option) => {
                    return <Option key={option} optionText={option} addToTeam={this.props.addToTeam} remove={this.props.remove} />
                })}
            </div>
        )
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
                {this.props.optionText}
                <button onClick={() => {
                    this.props.addToTeam(this.props.optionText)
                }}>Add to My Team</button>
                <button onClick={() => {
                    this.props.remove(this.props.optionText)
                }}>Remove</button>
            </div>
        )
    }
}

class MyTeam extends React.Component {
    render() {
        return (
            <div>
                <h3>My Team</h3>
                {this.props.myTeam && this.props.myTeam.map((item) => {
                    return <Team key={item} optionText={item} removeFromTeam={this.props.removeFromTeam} />
                })}
            </div>
        )
    }
}

class Team extends React.Component {
    render() {
        return (
            <div>
                {this.props.optionText}
                <button onClick={() => {
                    this.props.removeFromTeam(this.props.optionText)
                }}>Remove</button>
            </div>
        )
    }
}

const app = document.querySelector('#app')
ReactDOM.render(<Pokemon />, app)



// When we install something locally instead of globally, we can't run the command from the terminal anymore
// Instead, we set up scripts in package.json where we can define how we use the dependencies
// 