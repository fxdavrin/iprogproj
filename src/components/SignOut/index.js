import React from 'react';
import './si.css';

import { auth } from '../../firebase';

const SignOutButton = () =>
  <button type="button" className="si-btn" onClick={auth.doSignOut}>
    Sign Out
  </button>

export default SignOutButton;
