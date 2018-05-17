import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';


class Comments extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      comments: [],
      users: {},
      movieId: [],
    };

    this.onAddComment = this.onAddComment.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
  }

  componentWillMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );

    db.onCommentAdded((snapshot) => {
      this.setState(prevState => ({
        comments: [ snapshot.val(), ...prevState.comments ],
      }));
    });

  }

  onChangeComment(event) {
    const { value } = event.target;
    this.setState(() => ({ value }));
  }

  onAddComment(event) {
    event.preventDefault();

    const { authUser } = this.context;
    const { value } = this.state;
    const { movieId } = this.props.data.imdbID;
  

    db.doCreateComment(authUser.uid, value, movieId)
    this.setState(() => ({ value: ''  }));
  }

  


  render() {
    const {
      comments,
      users,
      value,
      movieId
    } = this.state;

    return (
      
      <div>

        <ul>
          {comments.map((list, key) =>
            <Lists
              key={key}
              list={list}
              user={users[list.userId]}
            />
          )}
        </ul>

        <form onSubmit={this.onAddComment}>
          <input
            type="text"
            value={value}
            onChange={this.onChangeComment}
          />
          <br></br>
          <button type="submit">Save</button>
        </form>

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

Comments.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Comments);