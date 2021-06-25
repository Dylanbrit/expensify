const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Dylan',
            age: 31
        })
        reject('something went wrong')
    }, 3000)
})

// The Promise() argument is where we put our callback function that contains our asynchronous task
// Once the task is complete, we call one of two functions- one if it went well and one if it did not go well
// The two functions are called resolve and reject, and they are provided in the Promise function arguments
console.log('before')

promise.then((data) => {
    console.log('1', data)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('this is my second promise')
        }, 3000)
    })
}).then((data) => {
    console.log(data)
    console.log('2')
}).catch((error) => {
    console.log('error: ', error)
})

console.log('after')
// To determine what we do once the promise succeeds, we access promise and then use callbacks on it
// We start by using .then() to register the callback that fires if the promise resolves
// We have access to the data that is resolved by the promise, and we call this argument data
// We can also resolve an object, passing data down in key/value pair format
// If we want to set a reject message, we can attach .catch() to the end of our .then()
// Inside we pass in what we want to do when there is an error

// Promise Chaining
// The goal with promise chaining is to be able to do multiple things for a promise
// Promises chain on after a then() call
// The second then() does not get anything passed to it unless we return data inside the first then() call
// As opposed to returning data to be passed along to the next then() call, we can also return another promise
// If we return a promise, the next then() callback is that promise's success case
// 