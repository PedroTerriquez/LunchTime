import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Axios from 'axios'
import Loading from '../loading/loading.js'
import { Button } from 'reactstrap'
import AddDishModal from './new_dish.js'

export default class DishesAll extends Component {
	constructor() {
		super();
		this.state = {
			dishes: [],
			loading: true,
			modal: false,
			id: "",
			name: "",
			description: "",
			ingredients: ""
		};
		this.editDishModal = this.editDishModal.bind(this)
		this.toggle = this.toggle.bind(this)
	}

	componentDidMount() {
    const url = 'https://islunchtime.herokuapp.com/api/dishes';
    const method = 'GET';
    Axios({ url, method }).then(res => {
    	this.setState({
    		dishes: res.data,
    		loading: false
    	});
    }).catch(err => {
      console.error(err);
    })
	}

	componentWillUnmount() {
		this.setState({
			dishes: [],
			loading: true
		})
	}

	toggle() {
    this.setState({
    	id: "",
    	name: "",
    	description: "",
    	ingredients: "",
      modal: !this.state.modal
    });
  }

	delete(id) {
    const url = `https://islunchtime.herokuapp.com/api/dishes/${id}`;
    const method = 'DELETE';
    Axios({ url, method }).then(res => {
    	console.log("deleted")
    	console.log(res)
    }).catch(err => {
      console.error(err);
    })
	}

	editDishModal(id, name, description, ingredients) {
		this.setState({
			id: id,
			name: name,
			description: description,
			ingredients: ingredients,
			modal: true
		})
	}

	dishesInfo() {
		const { dishes } = this.state;
		let listDishes = ''
		if(Object.keys(dishes).length > 1) {
			return dishes.map(dish => (
				<tr key={dish._id}>
					<td>{dish.name}</td>
					<td>{dish.description}</td>
					<td>{dish.ingredients.join()}</td>
					<td>
						<Button
							color='danger'
							onClick={ () => this.delete(dish._id) }>
							Borrar
						</Button>
						<Button
							color='success'
							onClick={ () => this.editDishModal(
								dish._id,
								dish.name,
								dish.description,
								dish.ingredients) }>
							Editar
						</Button>
						<Link to={ `/dishes/${dish._id}/review` }>
							<Button color='warning'>Review</Button>
						</Link>
					</td>
				</tr>
			));
		}
	}

	renderTable() {
		const { id, name, description, ingredients, modal } = this.state
		return(
			<div>
				<AddDishModal
					_id={ id }
					name={ name }
					description={ description }
					ingredients= { ingredients }
					modal={ modal }
					toggle={this.toggle.bind(this)}
				/>
        <Button color="secondary" onClick={this.toggle} >Add new</Button>
				<div className='table-responsive-sm'>
					<table className='table table-bordered'>
						<thead className='thead-light'>
							<tr>
								<th>Name</th>
								<th>Description</th>
								<th>Ingredients</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{ this.dishesInfo() }
						</tbody>
					</table>
				</div>
			</div>
		)
	}

	render() {
		const { loading } = this.state
		return (
  		<div>
  			{ loading ? <Loading /> : this.renderTable()}
  		</div>
		);
	}
}
