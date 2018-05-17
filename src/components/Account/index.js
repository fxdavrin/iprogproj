import React from 'react';
import AuthUserContext from '../Session/AuthUserContext';
import withAuthorization from '../Session/withAuthorization';
import { auth } from '../../firebase'
import './Account.css';

const AccountPage = () =>

  <AuthUserContext.Consumer>
    
    {authUser=>

        <div className="col-xs-12 my-list-container">
        <h1>{console.log(auth.user)} lists</h1>
        </div>
    }

  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);

// Vi använder inte den här sidan...