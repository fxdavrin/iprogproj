import React from 'react';
import PropTypes from 'prop-types';
import './navigation.css';


const Navigation = (props, { authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

Navigation.contextTypes = {
  authUser: PropTypes.object,
};

const NavigationAuth = () =>
<div>
<div className="header">
<img className="header-pic" src={require('./cinemania.jpg')} alt="header" />
</div>

<div className="navbar">
      <a href="./search">SEARCH</a>
      <a href="./account">MY FAVORITE MOVIES</a>
      <a href="./create">CHAT</a>
      <a className="signout" href="./signout">SIGN OUT</a>
</div>
</div>



const NavigationNonAuth = () =>

  <div>
  <div className="header">
  <img className="header-pic" src={require('./cinemania.jpg')} alt="header" />
  </div>
  </div>

export default Navigation;