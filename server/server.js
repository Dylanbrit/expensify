// This is responsible for serving up our public directory in production
// The tool to create ths server is called Express- a tool for creating web servers with node
// We run express through node in the terminal
// The node way of importing things is shown below, using require() with the source and setting it to a variable of the same name
// We use app.use() to customize our express servers, so we can register middleware, something that runs for each request
// We use express.static(), passing the return value into app.use()
// express.static() takes an argument, the path to the public folder
// We set up path how we normally do, and when we use join(), we provide three arguments, the current directory, the command to go up a folder, and the folder name we are targeting
// We start up the server using app.listen()
// When we listen, we have to listen on a specific port- we use port 3000 because it's available on all operating systems, so we can attach to it for development purposes without getting any warnings from our operating system
const path = require('path')
const express = require('express')
const app = express()
const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))
// Then, to run the server, in the terminal run the command node server/server.js
// On our secondary pages, if you refresh while on the page it will fail to reload properly
// This is because there is no file for the secondary pages inside of public
// To solve this, we need to server up index.html for all files that dont have a match, to make sure BrowserRouter still works
// We did the same thing we did in webpack.config when we set historyApiFallback to true
// This served up index.html in the public folder every time we got a 404
// We need to do the same thing here so that all of our secondary pages will work when you directly visit them
// We use app.get() to let us set up a function to run when someone makes a get request to our server
// The first argument is the path, and we use '*' to match all unmatched routes
// The second argument is a funtcion, where we process al unhandled requests, and send back index.html file in the public directory
// The two arguments it gets called with are request object (contains info about the request) and response object (lets us manipulate the response our express server makes to whoever made the http request)
// We call response.sendFile to send the file, then we use join() on publicPath (the path to the public folder) and index.html
app.get('*', (request, response) => {
    response.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
    console.log('Server is up')
})

// We create a server here, and then we create an express application and tell it to use the public directory to serve up all our static assets
// If what the person requested isn't in the public folder, just give them index.html
// Then start up on port 3000