class Trips extends React.Component {
    constructor(props) {
        super(props)
        this.addOption = this.addOption.bind(this)
        this.removeOne = this.removeOne.bind(this)
        this.removeAll = this.removeAll.bind(this)
        this.addToMyPlaces = this.addToMyPlaces.bind(this)
        this.state = {
            options: [],
            currentPlace: undefined,
            myPlaces: []
        }
    }
    addOption(name) {
        this.setState((previousState) => {
            return {
                options: previousState.options.concat(name)
            }
        })
    }
    removeOne(optionToRemove) {
        this.setState((previousState) => {
            return {
                options: previousState.options.filter((option) => {
                    if (optionToRemove !== option) {
                        return option
                    }
                })
            }
        })
    }
    removeAll() {
        this.setState(() => {
            return {
                options: []
            }
        })
    }
    addToMyPlaces(text) {
        this.setState((previousState) => {
            return {
                myPlaces: previousState.myPlaces.concat(text)
            }
        })
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
        } catch (e) {
            // Do nothing
        }
    }
    componentDidUpdate(previousProps, previousState) {
        if (previousState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }
    render() {
        return (
            <div>
                <Header />
                <AddOption addOption={this.addOption} removeAll={this.removeAll} />
                <Options options={this.state.options} removeOne={this.removeOne} addToMyPlaces={this.addToMyPlaces} />
                <MyPlaces myPlaces={this.state.myPlaces} addToMyPlaces={this.addToMyPlaces} />
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Trip Planner</h1>
                <h2>Plan your trips!</h2>
            </div>
        )
    }
}

class AddOption extends React.Component {
    addOption(e) {
        const name = e.target.elements.text.value
        
        this.props.addOption(name)

        e.target.elements.text.value = ''

        e.preventDefault()
    }
    render() {
        return (
            <div>
                <button onClick={this.props.removeAll}>Remove All</button>
                <form onSubmit={(e) => {
                    this.addOption(e)
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
                    return <Option key={option} optionText={option} removeOne={this.props.removeOne} addToMyPlaces={this.props.addToMyPlaces} />
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
                    this.props.addToMyPlaces(this.props.optionText)
                }}>Add to My Places</button>
                <button onClick={() => {
                    this.props.removeOne(this.props.optionText)
                }}>Remove</button>
            </div>
        )
    }
}

class MyPlaces extends React.Component {
    render() {
        return (
            <div>
                <h3>My Saved Places</h3>
                {this.props.myPlaces && this.props.myPlaces.map((place) => {
                    return <Place key={place} optionText={place} />
                })}
            </div>
        )
    }
}

class Place extends React.Component {
    render() {
        return (
            <div>
                {this.props.optionText}
            </div>
        )
    }
}

const app = document.querySelector('#app')
ReactDOM.render(<Trips />, app)