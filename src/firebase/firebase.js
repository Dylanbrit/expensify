import * as firebase from 'firebase'

// const firebaseConfig = {
//     apiKey: "AIzaSyAkvlR-teL3R_KeIjp0U79ueRusSS_SCrE",
//     authDomain: "expensify-ded8f.firebaseapp.com",
//     databaseURL: "https://expensify-ded8f-default-rtdb.firebaseio.com",
//     projectId: "expensify-ded8f",
//     storageBucket: "expensify-ded8f.appspot.com",
//     messagingSenderId: "949756903818",
//     appId: "1:949756903818:web:f709abecea8e9809674873"
// }

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: "1:949756903818:web:f709abecea8e9809674873"
}

// We want to create a separate database to handle our test cases
// During testing we are going to need to update the database to check if it is working, so we need a database just for testing
// To do this, we will need to add some conditionality to our config, so it knows what the value is based upon whether we are in production mode, development mode, or testing mode

firebase.initializeApp(firebaseConfig)

const database = firebase.database()

// By exporting firebase, any file can access firebase to edit the database
// We export the database variable as well so other files have the shortcut

export { firebase, database as default }

// child_removed
// database.ref('notes').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// // child_changed
// database.ref('notes').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// // child_added
// database.ref('notes').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// database.ref('notes').push({
//     description: 'first',
//     note: 'this was first',
//     amount: 100,
//     createdAt: 1000
// })

// database.ref('notes').once('value').then((snapshot) => {
//     const expenses = []
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })
//     console.log(expenses)
// })

// database.ref('notes').on('value', (snapshot) => {
//     const expenses = []
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })
//     console.log(expenses)
// }, (error) => {
//     console.log(error)
// })

// This is where we connect to the database
// If we want to connect to the database in other files, we just import firebase into them and they are good to go
// The new import syntax takes all the named exports from firebase and dumps them onto a new variable called firebase
// The reason we do this is because firebase does not have a default export
// All of these exports are stored on firebase as an object, so to access them we just use firebase.namedExport
// We copy over the firebase configuration info, and then use firebase.initializeApp to initialize firebase with the app we provided
// firebase.database gives us access to all the database features
// firebase provides us a database and all sorts of methods we can use to persist data
// ref() is short for reference and it gives us a reference to a specific part of our database
// If we don't pass anything into ref() then we are getting a reference to the root of the database, which is why all the attributes provided show up
// set() is called to set the value for that reference
// An object does not need to be passed to set()
// ref() picks which part of the database we want to change and set() establishes what we want to change
// This is an asynchronous process- our calls to set() need to communicate with the firebase servers
// We initialize the request to the server, the server has to process it, then they have to respond
// To handle our asynchronous processes we are going to use ES6 promises
// Even though the delay in communication between the user and the server is very minimal, it is enough to lock everything up without asynchronous programming
// Our set() call is a promise and we can chain .then() calls onto the end of it to handle our success and failure resolutions

// Deleting data from database
// remove() is called on ref()
// We use ref() to identify what we want to remove, and chain on remove() to remove it, followed by our promise chaining for resolve and reject
// We can also use .set(null), but remove() is more explicit so we will be sticking with that

// Updating data on the database
// Using .set(), we can make changes to the database. However, by using .update() we can do it in one method very efficiently
// Unlike set, which can be called with anything, update needs to be called with an object
// On the object we provide all the things we want to update
// We can also provide things that don't exist yet if we want to add them to the database
// The updates object only updates at the root level. When we go into nested objects we cannot update inside of them
// To update inside a nested object, we need to provide the reference location as the key and the new value as the value

// Fetching data from the database
// We can set up subscriptions so that we are notified if a value in the database ever changes
// To fetch the data, we still make a call to the database and use ref()
// If we want to access the route, we don't pass anything into ref()- if we want a specific part we pass it into ref()
// To fetch, we use .once()- it takes the event type as its first argument
// once() returns a promise and we use that promise to do something when the data comes back or when there is an error
// Inside of our then() promise we do get the data back- it is known as a snapshot
// We can use snapshot.val() to return the data we requested- snapshot captures the data triggered on the event- 'child_removed' captures the one you remove on the snapshot- 'child_changed' captures the one you changed
// In this case we requested the root of the database which would be an object containing our data as properties
// Using once() our functions only run one time- if the data changes we do not get notified unless we make a query to the database
// on() is the method we use on the database.ref() call to subscribe so that we are notified any time the database has been changed
// on() gets called with two arguments- the event type to watch for, and the callback function to run when that event occurs
// We cannot use promise chaining with on() because it needs to run multiple times, and promises can only be resolved one time
// Instead we use the callback function to run the code we want for our event situation
// To cancel a subscription we use off()
// We can remove one of our subscriptions by passing in a function
// off() takes no arguments or it takes two- we cannot pass in only one argument
// If no arguments are passed in, it will just cancel all current subscriptions
// The two arguments that need to be passed in are- the event, and the function
// Subscriptions can also notify us of errors, such as trying to access data we don't have access to
// We pass the error function in as the third function argument

// Since firebase does not support arrays, we need to change our array data into an object for the formatting to be correct
// When we use .push() on our database, firebase creates a new poperty on our reference, gives it a random value and injects the info we pass into push inside our object
// When we are ready to send our firebase data to the redux store, we are going to need to convert it into an array, since redux expects an array
// forEach() is part of the firebase API, so we can use this to convert our object into an array
// We can start by creating an empty array, then fetching our data using once(), then using forEach on our snapshot
// Inside of forEach, we want to push each item onto the empty array- each item is an object with all the properties they require
// Using the key property provided by firebase, we can identify the id that firebase generated for each item
// To access the rest of the values for each property of every childSnapshot, we can just spread out snapshot.val(), which has all the data we need to push for each property

// The three most common events that fire on our firebase methods are child_removed, child_changed, and child_added- the snapshot in our callback function captures the item we remove, change, or add when listening for these events
// child_added is teh only weird one, as it will also document all of our existing items as well as ones that we add