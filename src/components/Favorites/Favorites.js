import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import './Favorites.css'

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: []
    };
  }

  componentWillMount() {
    db.onFavoriteAdded((snapshot) => {
      this.setState((prevState) => ({
        favorites: [ snapshot.val(), ...prevState.favorites],
      }
    ))
    });
  }

  
  render() {
    const { favorites } = this.state;
    return (
      <div className="col-xs-12 my-list-container">
          {favorites.map((favs, key ) =>
            <Fav
              key={key}
              favs={favs}
            />
          )}
      </div>
    );}}




const Fav = ({ favs }) => {

    return (

      <div className="col-xs-5 lists">
      <ul className="list-list">
      <Link className="movie-link" to={'/search'}>
      <li className="movie-list-container">
      <img src={favs.poster} alt="foto" />
      <h3>{favs.title}</h3>
      <p>{favs.plot}</p>
      </li>
      </Link>
      </ul>
      </div>

      );

  };


Favorites.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Favorites);