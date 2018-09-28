import React, { Component } from "react";
import Axios from  'axios';
import Input from '../input/input.js';

export default class Menu extends Component {
	constructor(){
		super();
		this.state = {
			dishes: '',
			date: ''
		};
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const { dishes, date } = this.state;
    const url = 'https://islunchtime.herokuapp.com/api/menus';
    const method = 'POST'
    Axios({ url, method, data: { dishes, date}})
    	.then(res => { console.log(res) })
    	.catch(err => {
    		console.error(err);
    	})
	}

	render(){
		const {dishes, date} = this.state;
		return(
			<form>
				<Input type='string' value={dishes} id='dishes' handleChange={this.handleChange}/>
				<Input type='date' value={date} id='date' handleChange={this.handleChange}/>
				<div>
					<button type='submit'>Save menu</button>
				</div>
			</form>
		);
	}
}
