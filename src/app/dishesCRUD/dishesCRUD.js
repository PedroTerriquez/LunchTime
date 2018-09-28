import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Axios from 'axios'

export default class DishesCRUD extends Component {
	constructor() {
		super();
		this.state = { dishes: [] };
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

	dishesInfo() {
		const { dishes } = this.state;
		let listDishes = ''
		if(Object.keys(dishes).length > 1) {
			return dishes.map(dish => (
				<tr key={dish._id}>
					<td>{dish.name}</td>
					<td>{dish.description}</td>
					<td>{dish.ingredients.join()}</td>
					<td><button>borra</button></td>
					<td><button>edita</button></td>
					{console.log(`/dishes/${dish._id}/review`)}
					<td>
						<Link to={ `/dishes/${dish._id}/review` }>
							Review
						</Link>
					</td>
				</tr>
			));
		}
	}

	render() {
		return (
  		<div>
				<table>
					<thead>
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
		);
	}
}
