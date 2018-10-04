import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Axios from 'axios'
import Loading from '../loading/loading.js'
import { Button } from 'reactstrap'

export default class DishesCRUD extends Component {
	constructor() {
		super();
		this.state = {
			dishes: [],
			loading: true
		};
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
						<Button color='danger'>Borrar</Button>
						<Button color='success'>Editar</Button>
						<Link to={ `/dishes/${dish._id}/review` }>
							<Button color='warning'>Review</Button>
						</Link>
					</td>
				</tr>
			));
		}
	}

	renderTable(){
		return(
			<table class='table table-bordered'>
				<thead class='thead-light'>
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
