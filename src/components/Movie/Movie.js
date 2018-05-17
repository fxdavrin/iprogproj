import React, { Component } from 'react';
import { firebase } from '../../firebase';
import './Movie.css';

class MoviePage extends Component {

	getMovieInfo() {
		let info = (
        this.props.data.response === "True"? 
	            <div className="col-xs-12 movie-container">
	              <div className="col-xs-12 col-md-8 col-md-push-4 col-lg-7 col-lg-push-5 movie-details">
									<h1>{this.props.data.title}</h1>
	                <p>{this.props.data.plot}</p>
	                <div className="genre-details">
	                  <div className="genres">
	                    <h3>Genres</h3>
	                    {this.props.data.genreList}
	                  </div>
	                  <div className="actors">
	                    <h3>Actors</h3>
	                    <div>{this.props.data.actors}</div>
	                  </div>
										<div className="language">
	                    <h3>Language</h3>
	                    <div>{this.props.data.language}</div>
	                  </div>
										<div className="writer">
	                    <h3>Writer</h3>
	                    <div>{this.props.data.writer}</div>
	                  </div>
	                  <div className="row release-details">
	                    <div className="col-xs-6"> <span className="details-title">Release date:</span> <span className="release-data">{this.props.data.released}</span></div>
	                    <div className="col-xs-6"> <span className="details-title">Running Time:</span> <span className="release-data">{this.props.data.runtime}</span> </div>
											<div className="col-xs-6"> <span className="details-title">Awards:</span> <span className="release-data">{this.props.data.awards}</span> </div>
											<div className="col-xs-6"> <span className="details-title">IMBD Rating:</span> <span className="release-data">{this.props.data.rating}</span> </div>
	                  </div>
	                </div>
	              </div>
	              <div className="col-xs-12 col-md-4 col-md-pull-8 col-lg-5 col-lg-pull-7 poster-container">
	                <img src={this.props.data.posterUrl} className="poster" alt="" />
	              </div>
								<div className="col-xs-12 add-to-list">
            	</div>
	            </div>
	            : 
	            <div className="error">
	              {this.props.data.response === "False"? <h3>No Movie Found</h3> : null}
							</div>);
							return info;
					}

		render() {
		
		 return ( 
			<div> 
			{this.getMovieInfo()} 
			</div>
		)
	}
}
			


export default MoviePage;