import React from 'react';

import './Input.css';

function Input({
	className,
	label,
	placeHolderText,
	labelText,
	type,
	value,
	onChange,
	onBlur,
}) {
	return (
		<div className='input__container'>
			<label htmlFor={label}>{labelText}</label>
			<input
				className={className ? `${className} input` : 'input'}
				id={label}
				name={label}
				type={type}
				value={value}
				placeholder={placeHolderText}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</div>
	);
}

export default Input;
