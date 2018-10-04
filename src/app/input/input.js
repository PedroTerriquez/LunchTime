import React, { Component } from 'react';
const Input = ({ type, value, id, handleChange, labelfor }) => (
	<div>
  		<div> { labelfor }: </div>
		<input
			type={ type }
			value={ value }
			id={ id }
			onChange={ handleChange }
		/>
	</div>
);

export default Input;
