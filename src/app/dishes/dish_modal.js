import React, { Component } from 'react'
//import Input from '../input/input.js'
import Textarea from '../input/textarea.js'
import { Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import DishApi from '../api/dish.js'

export default class AddDishModal extends Component {
	constructor({ name, description, ingredients }){
		super()
		this.state = {
			name: "",
			description: "",
			type: "",
			ingredients: [],
			prevID: ""
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.saveDish 		= this.saveDish.bind(this)
		this.updateDish 	= this.updateDish.bind(this)
	}

	static getDerivedStateFromProps(props, state) {
		if (props._id != state.prevID){
			return {
				prevID: props._id,
        name: props.name,
        description: props.description,
        ingredients: props.ingredients
    	}
    }
    return null
	}

	handleChange(event){
		this.setState({ [event.target.id]: event.target.value })
	}

	handleSubmit(event){
		debugger;
		event.preventDefault()
		const { name, description, ingredients, type } = this.state
		const { _id } = this.props
		if(_id){
			this.updateDish(_id, name, type, description, ingredients)
    }
		else {
			this.saveDish(name, type, description, ingredients)
    }
	}

	saveDish(name, type, description, ingredients) {
    DishApi.add({ name, type, description, ingredients}).then(res => {
    		this.props.toggle()
    		console.log(res)
    	})
    	.catch(err => {	console.error(err) })
	}

	updateDish(id, name, type, description, ingredients) {
    DishApi.update({ id, name, type, description, ingredients})
    	.then(res => {
    		this.props.toggle()
    		console.log(res)
    	})
    	.catch(err => {	console.error(err) })
	}

	render(){
		const { name, type, description, ingredients } = this.state
		return(
			<div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="add-dish-modal">
					<form id='save-dish' onSubmit={ this.handleSubmit }>
          	<ModalHeader toggle={this.toggle}>Adding new dish</ModalHeader>
          	<ModalBody>
							<Label for="name">Name: </Label>
							<Input type='text' value={ name } id='name'
								onChange={ this.handleChange }/>
							<Textarea rows='4' cols='20' labelFor='Description'
								id='description' handleChange={ this.handleChange } value={ description }/>
							<Label for="ingredients">Ingredients: </Label>
							<Input type='text' value={ ingredients } labelfor="Ingredients"
								id='ingredients' onChange={ this.handleChange }/>
							<Label for="type">Type: </Label>
							<Input type="select" id="type" onChange={ this.handleChange } multiple>
            		<option>All</option>
            		<option>Drinks</option>
            		<option>Starter</option>
            		<option>Side</option>
            		<option>Main Dish</option>
            		<option>Desserts</option>
          		</Input>
          	</ModalBody>
          	<ModalFooter>
            	<Button type="submit" color="primary">Save</Button>{' '}
            	<Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          	</ModalFooter>
					</form>
        </Modal>
			</div>
		)
	}
}
