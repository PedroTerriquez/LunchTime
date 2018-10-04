import React, { Component } from 'react';
import Axios from 'axios';
import Input from '../input/input.js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class AddDishModal extends Component {
	constructor(){
		super();
		this.state = {
			name: '',
			description: '',
			ingredients: [],
			modal: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.toggle = this.toggle.bind(this)
	}

	toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
			<div>
				<Button color="primary" onClick={this.toggle}>Add Dish</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="add-dish-modal">
					<form id='save-dish' onSubmit={ this. handleSubmit }>
          	<ModalHeader toggle={this.toggle}>Adding new dish</ModalHeader>
          	<ModalBody>
							<Input type='text' value={ name } id='name' labelfor="Nombre"
								handleChange={ this.handleChange }/>
							<Input type='text' value={ description } labelfor="Description"
								id='description' handleChange={ this.handleChange }/>
							<Input type='text' value={ ingredients } labelfor="Ingredients"
								id='ingredients' handleChange={ this.handleChange }/>
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
