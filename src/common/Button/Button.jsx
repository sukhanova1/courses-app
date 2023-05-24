import React from 'react';

import './Button.css';

function Button({ text, classname, onClick, type, view, src, title }) {
	return view === 'button' ? (
		<button
			className={classname ? `button ${classname}` : 'button'}
			type={type}
			onClick={onClick}
		>
			{text}
		</button>
	) : (
		<button
			className={classname ? `button__icon ${classname}` : 'button__icon'}
			type={type}
			title={title}
			onClick={onClick}
		>
			<img src={src} alt={view} width='25px' />
		</button>
	);
}

export default Button;
