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
