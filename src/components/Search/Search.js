import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom';
import { db, auth, firebase } from '../../firebase';
import withAuthorization from '../Session/withAuthorization';
import MoviePage from '../Movie/Movie.js';
import Comments from '../Comments/Comments.js';
import './Search.css';

const fetch = require('isomorphic-fetch');

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      searchUrl: 'https://www.omdbapi.com/?t=gomorrah&apikey=233c506f'
    };
    this.doSearch = this.doSearch.bind(this);
    this.submit = this.submit.bind(this);
    this.fetchApiData = this.fetchApiData.bind(this);
    this.renderMenuItemChildren = this.renderMenuItemChildren.bind(this);
  }


  componentDidMount() {

    this.fetchApiData(this.state.searchUrl);

  }

  fetchApiData(url){
    fetch(url)
      .then((result) => {
        return result.json()
      })
      .then((json) => {
        if(json.Response === "True"){
        this.setState({
          title: json.Title,
          year: json.Year,
          released: json.Released,
          runtime: json.Runtime,
          genreList: json.Genre,
          actors: json.Actors,
          plot: json.Plot,
          posterUrl: json.Poster,
          language: json.Language,
          writer: json.Writer,
          awards: json.Awards,
          rating: json.imdbRating,
          response: json.Response,
          imdbID: json.imdbID,
        });
        }
        else {
          this.setState({
            response: json.Response,
            error: json.Error
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  submit(query){
    if (!query) {
      return;
    }
    this.fetchApiData(`https://www.omdbapi.com/?t=${query}&apikey=233c506f`);
  }

  doSearch(query) {
    if (!query) {
      return;
    }

    fetch(`https://www.omdbapi.com/?s=${query}&apikey=233c506f`)
      .then((result) => {
        return result.json()
      })
      .then((json) => {
        this.setState({
          options: json.Search
        })
      });
  }

  renderMenuItemChildren(option, props, index) {
    return (
      <div key={option.imdbID} onClick={this.submit.bind(this, option.Title)}>
        <span>{option.Title}</span>
      </div>
    );
  }


  addFavorite() {
    db.doAddFavorites(this.state.imdbID, this.state.title, this.state.plot, this.state.posterUrl, firebase.auth.currentUser.uid)
      .then(() => {
      })
      .catch(error => {
        this.setState('error', error);
      });
  }

    removeFavorite() {
      db.doRemoveFavorites(this.state.imdbID, firebase.auth.currentUser.uid)
        .then(() => {
        })
        .catch(error => {
          this.setState('error', error);
        });

  }



  render() {

    return (
      <div className="row">
        <div className="col-xs-12 col-lg-10 col-lg-offset-1">
          <div className="search-header col-xs-12">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-lg-5 search-text-container">
              <div className="search-text">Search for a movie</div>
              </div>
              <div className="col-xs-12 col-sm-6 col-lg-7">

                  <AsyncTypeahead
                    ref="typeahead"
                    {...this.state}
                    labelKey="Title"
                    onSearch={this.doSearch}
                    options={this.state.options}
                    placeholder='Search Title'
                    className="search-input-box"
                    renderMenuItemChildren={this.renderMenuItemChildren}
                  />

              </div>
            </div>
          </div>

          <MoviePage data={this.state} />

          <Link to={'/favorites'} key={this.state}>
          <button onClick={() => this.addFavorite() }>ADD TO FAV</button>
          </Link>

          <button onClick={() => this.removeFavorite() }>REMOVE FAV</button>

          <Comments data={this.state}/>

        </div>
      </div>
    );
  }
}



const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(SearchPage);
