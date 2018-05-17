import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';


class Create extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      lists: [],
      users: {},
    };

    this.onAddList = this.onAddList.bind(this);
    this.onChangeList = this.onChangeList.bind(this);
  }

  componentWillMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );

    db.onListAdded((snapshot) => {
      this.setState(prevState => ({
        lists: [ snapshot.val(), ...prevState.lists ],
      }));
    });
  }

  onChangeList(event) {
    const { value } = event.target;
    this.setState(() => ({ value }));
  }

  onAddList(event) {
    event.preventDefault();

    const { authUser } = this.context;
    const { value } = this.state;

    db.doCreateList(authUser.uid, value);

    this.setState(() => ({ value: '' }));
  }

  


  render() {
    const {
      lists,
      users,
      value,
    } = this.state;

    return (
      
      <div>

        <ul>
          {lists.map((list, key) =>
            <Lists
              key={key}
              list={list}
              user={users[list.userId]}
            />
          )}
        </ul>

        <form onSubmit={this.onAddList}>
          <input
            type="text"
            value={value}
            onChange={this.onChangeList}
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

  return <li><strong>{savedLists}</strong> {list.text}</li>;
}

Create.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Create);