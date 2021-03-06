import React, { Component } from "react"
import Input from '../input/input.js'
import AddDishModal from '../dishes/dish_modal.js'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import DishApi from '../api/dish.js'
import Menu from '../api/menu.js'

export default class AddMenuModal extends Component {
	constructor() {
		super()
		this.state = {
			redirect: false,
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
		DishApi.all().then(dishes => {
			this.setState({ dishes })
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
		Menu.add({ dishes: selectedDishes, date: date})
			.then(res => {
				this.toggle()
				console.log(res)
				this.setState({redirect: true})
			})
			.catch(err => { console.error(err) })
	}

	toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

	renderSelectedDishes(selectedDishes, dishes) {
		//TODO Improve this design no mames
		return selectedDishes.map(dish_id => (
			<li>{dishes.find(d => d._id == dish_id).name}</li>
		))
	}

	renderDishesResults(dishes) {
		//TODO Improve this design no mamamr
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
		const { redirect, results, date, selectedDishes, search, dishes, modal } = this.state
		if (redirect) {
			//TODO Refresh using REACT
			//return <Redirect to='/' />
			window.location.reload()
		}
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
