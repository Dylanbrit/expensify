class App extends React.Component {
    constructor(props) {
        super(props)
        this.findCountry = this.findCountry.bind(this)
        this.fetchCountry = this.fetchCountry.bind(this)
        this.setCurrentCountry = this.setCurrentCountry.bind(this)
        this.state = {
            currentCountry: undefined,
            language: undefined,
            currency: undefined
        }
    }
    findCountry(e) {
        const name = e.target.elements.text.value

        this.fetchCountry(name)

        e.preventDefault()
    }
    fetchCountry(name) {
        fetch(`https://restcountries.eu/rest/v2/name/${name}`).then((response) => {
            return response.json()
        }).then((data) => {
            this.setCurrentCountry(data[0].name, data[0].languages[0].name, data[0].currencies[0].name)
            console.log(data)
        })
    }
    setCurrentCountry(name, language, currency) {
        this.setState(() => {
            return {
                currentCountry: name,
                language: language,
                currency: currency
            }
        })
    }
    render() {
        return (
            <div>
                <Header />
                <Action findCountry={this.findCountry} />
                <Results currentCountry={this.state.currentCountry} language={this.state.language} currency={this.state.currency} />
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Country Finder</h1>
                <h2>Pick a country</h2>
            </div>
        )
    }
}

class Action extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={(e) => {
                    this.props.findCountry(e)
                }}>
                    <input type="text" name="text" />
                    <button>Submit</button>
                </form>
                <div>
                    
                </div>
            </div>
        )
    }
}

class Results extends React.Component {
    render() {
        return (
            <div>
                Country Name: <p>{this.props.currentCountry}</p>
                Language Spoken: <p>{this.props.language}</p>
                Currency Used: <p>{this.props.currency}</p>
            </div>
        )
    }
}

const app = document.querySelector('#app')
ReactDOM.render(<App />, app)