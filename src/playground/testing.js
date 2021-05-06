// We use testing features to run quick tests across our applications to make sure everything is working fine
// The framework we are using for this course is called Jest, and is designed by Facebook to work with React very well
// We are going to install Jest, but it is not the kind of thing that we need to import into our project
// It is more like live-server or webpack where we use it from the command line
// Since we installed it locally it exists in package.json, and we are going to create a script for it that we can run to use it
// To use it, we need to create test files in our project where we can define our test cases
// Inside the source folder, we create a test folder to hold our test files
// The syntax we use in naming our files inside of the test folder needs to include .test.js on the end

// For our test, we create a function
// Then we call a method provided by Jest called test()
// The first argument for test() is a string explaining what we are testing and what we want to see the code do
// The second argument for test() is an arrow function with our test cases for our code inside
// We also get access to things provided by Jest, such as functions in the library that allows us to make assertions about our code
// For expect(), we pass in the value we want to make an assertion about, then we add on a method from Jest
// A common one is toBe, which checks if the first value equals whatever is passed in