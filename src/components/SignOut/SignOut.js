import React from 'react';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';

const SignOutButton = () =>

<center>
<br></br>
  <h4> Do you really want to sign out? </h4>
  <br></br>
  <Link to={'/'}>
 <button type="button" className="si-btn" onClick={auth.doSignOut}>
    Sign Out
  </button>
</Link>
</center>

export default SignOutButton;


