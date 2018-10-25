import React, { Component } from "react"
import Axios from 'axios'
import Input from '../input/input.js'
import AddDishModal from '../dishes/new_dish.js'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default class AddMenuModal extends Component {
	constructor() {
		super()
		this.state = {
			dishes: [],
			date: '',
			search: '',
			results: [],
			selectedDishes: [],
			modal: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.toggle = this.toggle.bind(this)
	}

	componentDidMount() {
		const url = 'https://islunchtime.herokuapp.com/api/dishes'
		const method = 'GET'
		Axios({ url, method }).then(res => {
			this.setState({ dishes: res.data })
		}).catch(err => {
			console.error(err)
		})
	}

	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	handleClick(event) {
		event.persist()
		this.setState({
			results: [],
			search: ''
		})
		if (this.state.selectedDishes.indexOf(event.target.id) == -1) {
			this.setState(prevState => ({
				selectedDishes: [...prevState.selectedDishes, event.target.id]
			}))
		}
		else { alert("Already added") }
	}

	substringOf(str, substr) {
		return (str.toUpperCase().indexOf(substr.toUpperCase()) > -1)
	}

	handleSearchInputChange(event) {
		const { dishes } = this.state
		let word = event.target.value
		let res = dishes.filter(dish => this.substringOf(dish.name, word))
		this.setState({
			results: res,
			search: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		const { selectedDishes, date } = this.state
		const url = 'https://islunchtime.herokuapp.com/api/menus'
		const method = 'POST'
		Axios({ url, method, data: { dishes: selectedDishes, date: date } })
			.then(res => {
				this.toggle()
				console.log(res) })
			.catch(err => { console.error(err) })
	}

	toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

	renderSelectedDishes(selectedDishes, dishes) {
		return selectedDishes.map(dish_id => (
			<li>{dishes.find(d => d._id == dish_id).name}</li>
		))
	}

	renderDishesResults(dishes) {
		return dishes.map(dish => (
			<button
				onClick={this.handleClick}
				id={dish._id}
				value={dish.name}
				key={dish._id}
			>{dish.name}</button>
		))
	}

	render() {
		const { results, date, selectedDishes, search, dishes, modal } = this.state
		return (
			<div>
				<Button color="primary" onClick={this.toggle}>Add menú</Button>
        <Modal isOpen={ modal } toggle={this.toggle} className="add-menu-modal">
        	<AddDishModal />
					<form id='save-menu' onSubmit={this.handleSubmit}>
          	<ModalHeader toggle={this.toggle}>Adding new menu</ModalHeader>
          	<ModalBody>
							<Input labelfor="Select a date" type='date' value={date} id='date' handleChange={this.handleChange} />
							<ul>{this.renderSelectedDishes(selectedDishes, dishes)}</ul>
							<input
								labelfor="Select a dish"
								value={search}
								placeholder="Search for..."
								onChange={this.handleSearchInputChange}
							/>
							<ul>{this.renderDishesResults(results)} </ul>
          	</ModalBody>
          	<ModalFooter>
            	<Button type="submit" color="primary">Save</Button>{' '}
            	<Button color="secondary" onClick={this.toggle}>Cancel</Button>
          	</ModalFooter>
					</form>
        </Modal>
			</div>
		)
	}
}
