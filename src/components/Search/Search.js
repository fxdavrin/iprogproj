import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom';
import { db, auth, firebase } from '../../firebase';
import PropTypes from 'prop-types';
import withAuthorization from '../Session/withAuthorization';
import MoviePage from '../Movie/Movie.js';
import Comments from '../Comments/Comments.js';
import './Search.css';

const fetch = require('isomorphic-fetch');

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      users: {},
      movieId: '',
      value: '',
      searchInput: '',
      searchUrl: 'https://www.omdbapi.com/?t=gomorrah&apikey=233c506f'
    };

    this.onAddComment = this.onAddComment.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.submit = this.submit.bind(this);
    this.fetchApiData = this.fetchApiData.bind(this);
    this.renderMenuItemChildren = this.renderMenuItemChildren.bind(this);
  }


  componentDidMount() {
    this.fetchApiData(this.state.searchUrl);

    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
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

        db.onCommentAdded((snapshot) => {
          var show = snapshot.val()
          console.log(this.state.imdbID);
          if(show.movieId == this.state.imdbID){
          this.setState(prevState => ({
            comments: [ snapshot.val(), ...prevState.comments ],
          }));}
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
          options: json.Search,
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

  onChangeComment(event) {
    const { value } = event.target;
    this.setState(() => ({ value }));
  }

  onAddComment(event) {
    event.preventDefault();

    //const { authUser } = this.context;
    const { value } = this.state;


    db.doCreateComment(firebase.auth.currentUser.uid, value, this.state.imdbID)
    this.setState(() => ({ value: ''  }));
  }





  render() {
    const {
      comments,
      users,
      value,
      movieId,
    } = this.state;
   return  (
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

          <div>

          <div>
          <ul>
            {comments.map((list, key, movieId) =>
              <Lists
                key={key}
                list={list}
                user={users[list.userId]}
                movieId={list.movieId = this.state.imdbID}
              />
            )}
          </ul>
          </div>

            <form onSubmit={this.onAddComment}>
              <input
              type="text"
              value={value}
              onChange={this.onChangeComment}
              />
            <br></br>
            <button type="submit">COMMENT</button>
          </form>

          </div>

        </div>
      </div>
    );

  }
}

const Lists = ({ list, user }) => {
  const savedLists = user
    ? `${user.username}:`
    : '???';

  return <ul><strong>{savedLists}</strong> {list.text}</ul>;
}





const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(SearchPage);
