import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Axios from  'axios'

export default class Calendar extends Component {
	constructor() {
		super();
		this.state = { menus: [] };
	}

	componentDidMount() {
    const url = 'https://islunchtime.herokuapp.com/api/menus';
    const method = 'GET';
    Axios({ url, method }).then(res => {
    	this.setState({ menus: res.data || [] });
    }).catch(err => {
      console.error(err);
    })
	}

	printCalendar(){
	}

	render() {
		const { menus } = this.state;
		let listMenus = ''
		if (menus.length) {
			listMenus = menus.map((menu) =>
				<tr key={menu._id}>
					<th>
						Month {new Date(menu.date).getMonth()+1} - 
						Day {new Date(menu.date).getDate()+1}
					</th>
					<th>{menu.dishes[0].name}</th>
				</tr>
			);
		}
		return (
  		<div>
  			<div>Monthly Menu:</div>
  			<Link to='/menus/new'>
  				<button type="submit" className="btn btn-primary">Add menu </button>
  			</Link>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{ listMenus }
					</tbody>
				</table>
  		</div>
		);
	}
}

