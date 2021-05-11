// Git
//
// Git is the version control system that we are going to be using to keep track of our project code
// This makes it easy to track previous versions of our code and work on our code with others
// Similar to a video game, with git we can have multiple save spots where we can go and work on the project, not just the most recent save
// The first thing we do is initialize our project with git by creating a repository
// This is a place where git stores our code, each project gets one repository- it is a folder that sits inside of our project
// When we create the repo, it automatically picks up all the files inside our project
// Commits are like save points
// The first command we run is git add- which lets us take files from being untracked files to being staged changes
// Staged chhanges makes up everything that is going to be in the next commit
// Here we can gather all the files we want to save and we can save them in a commit
// Staged changes still aren't being saved by git, this just allows us to set up our next save point
// Once we have the staged changes in place we can make a commit, then everything will be saved by git
// We use the git commit command to commit our staged changes
// Unstaged changes contains everything that git is tracking but we haven't staged yet
// If we start working on a file that is committed, all of our changes made since the last save point will appear in unstaged changes
// When we commit the newest version, it gets saved as a new commit in our repository
// This means we will have two commits (save points)- the original project, and the project containing all of the original plus new edits
// Untracked files- files git is not tracking
// Unstaged changes- files git is tracking but have changed since the last time it saved it
// Staged changes- everything ready for the next commit
// Commits- all of the save points throughout our project
// To begin we need to create a new repository, starting with the git init command from inside the root folder of our project
// This initializes a new directory on our machine
// The second command we run is git status- this prints out a high level overview of our repository at the current point in time, giving us info about what files are where
// Now the files are in our project but they are not staged yet
// The next thing we want to do is determine which files we want git to track
// We only want git to track the files we actually wrote, so not node modules for example
// To ignore this folder we need to create a new configuration file in the root of our project called .gitignore, which provides us the paths to things we want to ignore
// We type in the name of the folder we don't want to add inside of .gitignore, followed by a /
// If we rerun git status, it will still show us our untracked files, but it will not include the ones we listed in .gitignore
// Now we can use git add to add these files, so we will move them from the untracked files area to the staged changes area
// We type in git add, which comes with arguments for the files we want to add
// If we want to add all of the untracked files, we can just type in git add .
// This will add everything in the current directory and subdirectories
// The next step is to run git commit
// To use git commit we need to add a message to describe what changed in the commit, like this git commit -m "initial commit"
// Once we run this, we get a bunch of output showing us what files were added to the git repository for the first time, as opposed to files git was tracking that happened to have changed
// The working tree refers to all the files that are a part of our project
// If we make changes to a file and we run git status, it will show us what has been modified since the last save under changes not staged for commit
// Now we have the choice to add it to the staging area and make a new commit
// We can make a new commit that just contains those changes we made since the last save
// To do that we use git add with teh file name we want to add
// Then we run git commit -m "message"
// Now that we made these changes, we have to commits in this repository- the initial commit and the commit that tracks the changes over time
// git log is similar to git status but is read only, and will log the commits that make up our repository


// GitHub
//
// Click New Repository- add repo name and create
// SSH- Secure Shell- a way to securely communicate with the Github servers from our machine
// To make it secure we need to set up SSH keys
// If we don't have SSH keys on our machine or we aren't sure, go to terminal and run git bash
// use the ls -a ~/.ssh command to list out all the files in a folder and the -a to show hidden files and the folder we are looking fo rin the user directory
// To generate an SSH key use the ssh-keygen -t rsa -b 4096 -C "dbrit007@fiu.edu" command to create a key type and size, as well as add our email
// Stick with the default file suggested to save the key in
// Hit enter a few times if you don't care about a passphrase, and you're done
// The second code is the one we give out, the first one we keep private like a password
// The next command is to let Github know which key to use
// eval "$(ssh-agent -s)"  - this checks if ssh-agent is running, and if it isnt it starts things up
// To push to Github, use the command git remote add origin https://github.com/Dylanbrit/Expensify-App.git
// To push the code up use the command git push -u origin main
// Github used to name the main branch master, but that has changed to main


// Getting Webpack ready for production
//
// Our current webpack build is huge, so we want to make it more convenient and efficient for production
// We can use webpack -p to stage it for production- this will let all our programs know to use the most bare bones code possible
// We go to package.json and create two webpack scripts- one for development and one for production
// The one for production will be set to webpack -p --env production
// -p allows us to minify our JS and sets the production environment variable for our third party libraries
// --env production lets us customize how webpack.config generates that object
// By switching to a function that returns the object, we get acccess to the environment variable in our arguments and use it in the object configuration
// We switch our syntax in webpack.config to make module.exports a function that returns our object with all its code
// The function gets called with some stuff like the environment to determine if it is in development or production mode
// We also set up our devtool to run a shittier version of source-map if being used for production