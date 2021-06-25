const { json } = require('express')
const path = require('path')
const { webpack } = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV = 'development') {
    require('dotenv').config({ path: '.env.development' })
} 

// process.env.NODE_ENV is an environment variable that stores the environment we are currently in
// heroku sets this for us automatically- it sets this value equal to the string production
// We are going to set this variable so that it knows if we are in test, production, or development
// To do this, we go over to package.json and change our test script to have an environment variable
// There's no good cross OS way of setting up a script to work on all operating systems, so we need to use an NPM module to let us set up environment variables regardless of system
// We only need to change the test script- the production script is set up by heroku, development isn't necessary because the absence of a variable will tell us it is meant for development

// In webpack.config, we set up process.env.NODE_ENV and set it equal to itself or 'development'
// Then we can use conditionals to devide what database we want to use depending on what mode we are in
// But since we never want to commit private api info to Github, we are gonna set up separate files for those api keys
// We only need to set them up for testing and development since heroku handles that
// Since it won't be commited to the git repository, heroku wouldnt have access to it
// After we create our files that holds our config data, we use an npm module to read the data from our file we need
// We install .env to read the environment file and set up our key-value pairs

module.exports = (env) => {
    const isProduction = env === 'production'
    
    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': json.STRINGIFY(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': json.STRINGIFY(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': json.STRINGIFY(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': json.STRINGIFY(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': json.STRINGIFY(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': json.STRINGIFY(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : "eval-cheap-module-source-map",
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    }
}

// IMPORTANT- INSTALL SASS-LOADER@V10.1.1