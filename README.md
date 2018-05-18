<<<<<<< HEAD

# Cinemania-React

// Description

The project will use a API that will retrieve information from IMDB (Internet Movie Database) through the site Omdb. Your are going to be able to login on the Welcome-page. Data from users as username, password and favorite movie will be stored in a database, so you will be able to see the saved data on another device as well. The stored movies will be connected to the user id. Since there are several movies in the database you will be able to search for a movie. The movie you have searched for will be displayed on the same screen with all the needed information.



// How to get started

1. First, make sure that you have npm installed on your system (follow the instructions at [Installing Node](https://docs.npmjs.com/getting-started/installing-node).

2. Run 'npm install' through the terminal in the root of the repository. Let it install all the dependencies.

3. Run 'npm start' through the terminal. This will start the webserver and the application should pop up in your browser ready for use. Alternatively you can open in through [http://localhost:3000]. Whenever you make changes in your code and save, the browser will update automatically, so you don't have to click refresh anymore.



// Understanding the code

* 'public/index.html' - this is the static html file, we don't put view's HTML here. It should only contain HTML that's shared among all the views (e.g. header, footer).

* 'src/index.js' - this is where React is started. It calls the App - which is our root component.

* 'src/index.css' - global styles here.

* 'src/app/index.js' - root component where it's HTML is modified and it has different routes to it.

* 'src/SignIn' - the starting page where we will be able to login, signup. when we are logged in we will redirect to the Search.js.

* 'src/Search' - searchbar that will also be connected with the movie.js the values in movie.js will depend on what you have searched for.



// Uses

* React (create-react-app)

* Firebase

* React-router-dom



// Features

* Search [x]

* Favorites [x]

* Sign In [x]

* Sign Up [x]

* Sign Out [x]

* Add to favorite [x]

* Remove from favorites [x]

* Commenting a specific movie [x]
=======
# Cinemania

How to set up: 

# react-firebase-authentication

[![Build Status](https://travis-ci.org/rwieruch/react-firebase-authentication.svg?branch=master)](https://travis-ci.org/rwieruch/react-firebase-authentication)

* Found in [Taming the State in React](https://roadtoreact.com/course-details?courseId=TAMING_THE_STATE)
* [Live](https://react-firebase-authentication.wieruch.com/)
* [Tutorial](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/)

## Features

* uses:
  * only React (create-react-app)
  * firebase 4.3.1
  * react-router 4.2.0
  * no Redux/MobX
  * [React's 16.3 context API](https://reactjs.org/blog/2018/03/29/react-v-16-3.html)
* features:
  * Sign In
  * Sign Up
  * Sign Out
  * Password Forget
  * Password Change
  * Protected Routes with Authorization
  * Database: Users

## Installation

* `git clone git@github.com:rwieruch/react-firebase-authentication.git`
* `cd react-firebase-authentication`
* `npm install`
* `npm start`
* visit http://localhost:3000/
* Use your own Firebase Credentials

### Use your own Firebase Credentials

* visit https://firebase.google.com/ and create a Firebase App
* copy and paste your Credentials from your Firebase App into src/firebase/firebase.js
* activate Email/Password Sign-In Method in your Firebase App
"# iprogproj" 
>>>>>>> ea386b7ca5ae25f48f17799f6ab71a3c919a7053
