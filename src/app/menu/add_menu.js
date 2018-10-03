import React, { Component } from "react";
import Axios from 'axios';
import Input from '../input/input.js';

export default class Menu extends Component {
	constructor() {
		super();
		this.state = {
			dishes: [],
			date: '',
			search: '',
			results: [],
			selectedDishes: []
		};
		this.handleChange = this.handleChange.bind(this)
		this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	componentDidMount() {
		const url = 'https://islunchtime.herokuapp.com/api/dishes';
		const method = 'GET';
		Axios({ url, method }).then(res => {
			this.setState({ dishes: res.data });
		}).catch(err => {
			console.error(err);
		})
	}

	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleClick(event) {
		event.persist();
		this.setState({ results: [] })
		this.setState({ search: '' })
		if (this.state.selectedDishes.indexOf(event.target.id) == -1) {
			this.setState(prevState => ({
				selectedDishes: [...prevState.selectedDishes, event.target.id]
			}))
		}
		else { alert("Already added") }
	}

	substringOf(str, substr) {
		return (str.toUpperCase().indexOf(substr.toUpperCase()) > -1);
	}

	handleSearchInputChange(event) {
		this.setState({ search: event.target.value })
		const { dishes } = this.state
		let word = event.target.value;
		let res = dishes.filter(dish => this.substringOf(dish.name, word));
		this.setState({ results: res })
	}

	handleSubmit(event) {
		event.preventDefault();
		const { selectedDishes, date } = this.state;
		const url = 'https://islunchtime.herokuapp.com/api/menus';
		const method = 'POST'
		Axios({ url, method, data: { dishes: selectedDishes, date: date } })
			.then(res => { console.log(res) })
			.catch(err => { console.error(err) })
	}

	renderCreatedMenu(selectedDishes, dishes) {
		return selectedDishes.map(dish_id => (
			<li>{dishes.find(d => d._id == dish_id).name}</li>
		));
	}

	renderDishesResults(dishes) {
		return dishes.map(dish => (
			<button
				onClick={this.handleClick}
				id={dish._id}
				value={dish.name}
				key={dish._id}
			>{dish.name}</button>
		));
	}

	render() {
		const { results, date, selectedDishes, search, dishes } = this.state;
		return (
			<form id='save-menu' onSubmit={this.handleSubmit}>
				<Input type='date' value={date} id='date' handleChange={this.handleChange} />
				<ul>{this.renderCreatedMenu(selectedDishes, dishes)}</ul>
				<input
					value={search}
					placeholder="Search for..."
					onChange={this.handleSearchInputChange}
				/>
				<ul>{this.renderDishesResults(results)} </ul>
				<button type='submit'>Save menu</button>
			</form>
		);
	}
}
