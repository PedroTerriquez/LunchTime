import React, { Component } from 'react';
const Input = ({ type, value, id, handleChange }) => (
	<div>
  		<div> { id }: </div>
		<input
			type={ type }
			value={ value }
			id={ id }
			onChange={ handleChange }
		/>
	</div>
);

export default Input;
