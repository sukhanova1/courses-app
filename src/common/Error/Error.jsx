import React from 'react';

import './Error.css';

function Error({ text, classname }) {
	return <p className={classname ? `error ${classname}` : 'error'}>{text}</p>;
}

export default Error;
