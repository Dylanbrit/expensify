// Object Destructuring
//
// Object Destructuring allows us to take an object and rip it apart so we can pull off various properties out into their own variables
// The syntax looks like this- const { name, age } = person
// On the riht we have the object we are trying to destructure and on the left we have our variable declaration and our curly braces
// Inside the curly braces we provide the things we want to grab
// If we have a person object with properties of name and age, we can grab those using that syntax
// It gets those values off of the person object- it looks for the person property with the same name

console.log('destructuring')

const person = {
    name: 'Dylan',
    age: 31,
    location: {
        city1: 'Miami',
        temp: 80
    }
}

// If we want to provide a default in our destructuring, we set that variable equal to whatever we want our default to be
const { name: firstName = 'Anonymous', age } = person
console.log(`${firstName} is ${age}.`)

// We can also destructure off of a nested object
// To do that, we just grab from the nested object using person.location
// If we want to rename our variable, we just put a colon after it, followed by the name we want to switch it to
const { temp: temperature, city1 } = person.location
if (city1 && temperature) {
    console.log(`It's ${temperature} degrees in ${city1}.`)
}

const book = {
    title: 'Fight Club',
    author: 'Chuck Palahniuk',
    publisher: {
        name: 'W.W. Norton & Company'
    }
}

const { name: publisherName = 'Self-published' } = book.publisher

console.log(publisherName)

// Array Destructuring
//
// Array Destructuring allows us to pull items off an array
// As you would imagine, we use square brackets- [] - to form our variable declaration
// For objects we use {} (which is object syntax) and for arrays we use [] (array syntax)
// Just like with object destructuring, we set the variable equal to the name of the object we want to destructure
// Inside our array bracket, we put an ordered list of variable names
// Each variable matches the value in the corresponding position in the original array we are trying to destructure
// Since the array doesn't have property names like an object does, they are matched by index position
// We do not need to destructure all items in an array
// If the one we don't want to destructure is the last one, we just leave it off of the variable declaration
// If the one we don't want to destructure is not the last one, we leave the variable out but leave in the comma that separates it from the rest
// There is no renaming syntax with arrays because there is no initial property name given, we just name it ourselves however we want
// Setting up a default value is the same as with objects- just set the variable name = 'default'
const address = ['2801 NE 183rd Street', 'Aventura', 'Florida', '33160']
const [street, city2, state = 'New York', zip] = address
console.log(`You are in ${state}!`)

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75']
const [itemName, , mediumPrice] = item
console.log(`A medium Coffee (hot) costs $2.50`)
console.log(`A medium ${itemName} costs ${mediumPrice}`)