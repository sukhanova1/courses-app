import React from 'react';

import { LOGO_ALT_VALUE } from '../../../../constants';

import logo from '../Logo/logo.png';
import './Logo.css';

function Logo() {
	return <img src={logo} alt={LOGO_ALT_VALUE} className='logo' />;
}

export default Logo;
