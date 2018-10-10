import React, { Component } from "react";
import { Redirect } from 'react-router';
import Axios from  'axios';
import Input from '../input/input.js';

export default class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			userId: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const { email, password } = this.state;
    const url = 'https://islunchtime.herokuapp.com/api/login';
    const method = 'POST';
    Axios({ url, method, data: { email, password } }).then(res => {
    	this.setState({ userId: res.data['_id'] });
    }).catch(err => {
      console.error(err);
    })
	}

	render() {
		const { email, password, userId } = this.state;
    if (userId) {
      return (<Redirect to="/dashboard"/>);
    }

		return (
  		<form id='log-in' onSubmit={ this.handleSubmit }>
  			<Input labelfor="Email" type="email" value={ email } id="email" handleChange={ this.handleChange }/>
  			<Input labelfor="Password" type="password" value={ password } id="password" handleChange={ this.handleChange }/>
  			<div>
  				<button type='submit'> Login </button>
  			</div>
  		</form>
		);
	}
}
