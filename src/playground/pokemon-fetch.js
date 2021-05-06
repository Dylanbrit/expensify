class App extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setCurrentOption = this.setCurrentOption.bind(this)
        this.setType2 = this.setType2.bind(this)
        this.state = {
            speciesName: undefined,
            type1: undefined,
            type2: undefined,
            hp: undefined,
            attack: undefined,
            defense: undefined,
            specialAttack: undefined,
            specialDefense: undefined,
            speed: undefined
        }
    }
    handleSubmit(e) {
        const name = e.target.elements.text.value

        this.fetchData(name)

        e.target.elements.text.value = ''

        e.preventDefault()
    }
    setCurrentOption(name, type1, hp, attack, defense, specialAttack, specialDefense, speed) {
        this.setState(() => {
            return {
                speciesName: name[0].toUpperCase() + name.substring(1),
                type1: type1,
                
                hp: hp,
                attack: attack,
                defense: defense,
                specialAttack: specialAttack,
                specialDefense: specialDefense,
                speed: speed
            }
        })
    }
    setType2(type2) {
        this.setState(() => {
            return {
                type2: type2
            }
        })
    }
    fetchData(name) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data)
            this.setCurrentOption(data.name, data.types[0].type.name, data.stats[0].base_stat, data.stats[1].base_stat, data.stats[2].base_stat, data.stats[3].base_stat, data.stats[4].base_stat, data.stats[5].base_stat)
            if (data.types[1]) {
                this.setType2(data.types[1].type.name)
            } else {
                this.setState(() => {
                    return {
                        type2: undefined
                    }
                })
            }
        })        
    }
    render() {
        return (
            <div>
                <Header />
                <Action handleSubmit={this.handleSubmit} />
                <Results name={this.state.speciesName} type1={this.state.type1} type2={this.state.type2} hp={this.state.hp} attack={this.state.attack} defense={this.state.defense} specialAttack={this.state.specialAttack} specialDefense={this.state.specialDefense} speed={this.state.speed} />
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Header</h1>
                <h2>Find an option</h2>
            </div>
        )
    }
}
// App is delayed in showing me the option i selected
// Every time I select one to begin I get an error message and state has not updated
// Then when I select a new option, I receive the data for the previously selected option and the state updates with previous selection
class Action extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={(e) => {
                    this.props.handleSubmit(e)
                }}>
                    <input type="text" name="text" />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

class Results extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.name}</p>
                <p>Primary Type: {this.props.type1}</p>
                {this.props.type2 && <p>Secondary Type: {this.props.type2}</p>}
                <p>HP: {this.props.hp}</p>
                <p>Attack: {this.props.attack}</p>
                <p>Defense: {this.props.defense}</p>
                <p>Special Attack: {this.props.specialAttack}</p>
                <p>Special Defense: {this.props.specialDefense}</p>
                <p>Speed: {this.props.speed}</p>
                <p>Total: {this.props.hp + this.props.attack + this.props.defense + this.props.specialAttack + this.props.specialDefense + this.props.speed}</p>
            </div>
        )
    }
}
// need to alter fetch function so that i am not returning something for type2 if it doesnt exist, or it messes everything up
// maybe a function call that only works if there is a secondary type in the data?
const app = document.querySelector('#app')
ReactDOM.render(<App />, app)