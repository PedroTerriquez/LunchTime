import React, { Component } from 'react';
import Axios from 'axios';
import Input from '../input/input.js';
import Textarea from '../input/textarea.js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class AddDishModal extends Component {
	constructor({ name, description, ingredients }){
		super();
		this.state = {
			name: "",
			description: "",
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
    	};
    }
    return null;
	}

	handleChange(event){
		this.setState({ [event.target.id]: event.target.value })
	}

	handleSubmit(event){
		event.preventDefault()
		const { name, description, ingredients} = this.state
		const { _id } = this.props
		if(_id){
			this.updateDish(_id, name, description, ingredients)
    }
		else {
			this.saveDish(name, description, ingredients)
    }
	}

	saveDish(name, description, ingredients) {
		const url = 'https://islunchtime.herokuapp.com/api/dishes'
    const method = 'POST'
    Axios({ url, method, data: { name, description, ingredients}})
    	.then(res => {
    		this.props.toggle()
    		console.log(res)
    	})
    	.catch(err => {	console.error(err) })
	}

	updateDish(_id, name, description, ingredients) {
		const url = `https://islunchtime.herokuapp.com/api/dishes/${_id}`
		const method = 'PATCH'
    Axios({ url, method, data: { name, description, ingredients}})
    	.then(res => {
    		this.props.toggle()
    		console.log(res)
    	})
    	.catch(err => {	console.error(err) })
	}

	render(){
		const { name, description, ingredients } = this.state
		return(
			<div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="add-dish-modal">
					<form id='save-dish' onSubmit={ this.handleSubmit }>
          	<ModalHeader toggle={this.toggle}>Adding new dish</ModalHeader>
          	<ModalBody>
							<Input type='text' value={ name } id='name' labelfor="Nombre"
								handleChange={ this.handleChange }/>
							<Textarea rows='4' cols='20' labelFor='Description'
								id='description' handleChange={ this.handleChange } value={ description }/>
							<Input type='text' value={ ingredients } labelfor="Ingredients"
								id='ingredients' handleChange={ this.handleChange }/>
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