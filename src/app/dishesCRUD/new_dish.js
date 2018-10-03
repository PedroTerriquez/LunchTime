import React, { Component } from 'react';
import Axios from 'axios';
import Input from '../input/input.js';

export default class Dish extends Component {
	constructor(){
		super();
		this.state = {
			name: '',
			description: '',
			ingredients: []
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event){
		this.setState({ [event.target.id]: event.target.value })
	}

	handleSubmit(event){
		event.preventDefault()
		const { name, description, ingredients} = this.state
		const url = 'https://islunchtime.herokuapp.com/api/dishes'
    	const method = 'POST'
    	Axios({ url, method, data: { name, description, ingredients}})
    		.then(res => { console.log(res) })
    		.catch(err => {	console.error(err) })
	}

	render(){
		const { name, description, ingredients } = this.state
		return(
		<form id='save-dish' onSubmit={ this. handleSubmit }>
			<Input type='text' value={ name } id='name' handleChange={ this.handleChange }/>
			<Input type='text' value={ description } id='description' handleChange={ this.handleChange }/>
			<Input type='text' value={ ingredients } id='ingredients' handleChange={ this.handleChange }/>
			<button type='submit'>Save</button>
		</form>
		)
	}
}
