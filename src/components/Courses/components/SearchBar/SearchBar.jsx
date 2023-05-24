import React from 'react';

import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';
import {
	BUTTON_SEARCH,
	INPUT_SEARCH_PLHOLDER,
	INPUT_SEARCH_LABEL,
	INPUT_TYPE_TEXT,
	BUTTON_TYPE_BUTTON,
	SEARCH_ICON_ALT,
} from '../../../../constants';

import searchIcon from './assets/search-icon.png';
import './SearchBar.css';

function SearchBar({ value, handleChange, handleClick }) {
	return (
		<div className='search-bar'>
			<img src={searchIcon} alt={SEARCH_ICON_ALT} width='30px' />
			<Input
				label={INPUT_SEARCH_LABEL}
				labelText=''
				type={INPUT_TYPE_TEXT}
				value={value}
				placeHolderText={INPUT_SEARCH_PLHOLDER}
				onChange={(e) => handleChange(e.target.value)}
			/>
			<Button
				view={BUTTON_TYPE_BUTTON}
				text={BUTTON_SEARCH}
				type={BUTTON_TYPE_BUTTON}
				onClick={(e) => handleClick()}
			/>
		</div>
	);
}

export default SearchBar;
