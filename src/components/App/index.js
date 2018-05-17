import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import SignUpPage from '../SignUp/SignUp';
import SignOutButton from '../SignOut/SignOut';
import SignInPage from '../SignIn/SignIn';
import SearchPage from '../Search/Search';
import AccountPage from '../Account';
import Create from '../Create/Create';
import Favorites from '../Favorites/Favorites';
import withAuthentication from '../Session/withAuthentication';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Cinemania',
    }
  }

  render() {
    return (
      <Router>
      <div className="App">
      <Navigation />
        <header className="App-header">
         <div className="header">
         </div>
          <Route exact path="/signup" component={() => <SignUpPage />} />
          <Route exact path="/" component={() => <SignInPage />} />
          <Route exact path="/search" component={() => <SearchPage />} />
          <Route exact path="/account" component={() => <AccountPage />} />
          <Route exact path="/create" component={() => <Create />} />
          <Route exact path="/signout" component={() => <SignOutButton />} />
          <Route exact path="/favorites" component={() => <Favorites />} />
        </header>
      </div>
      </Router>
    );
  }
}


export default withAuthentication(App);


