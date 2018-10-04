import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Loading from '../loading/loading.js'
import AddMenuModal from '../menu/add_menu.js'

export default class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			menus: [],
			loading: true
		};
	}

	componentDidMount() {
    const url = 'https://islunchtime.herokuapp.com/api/menus/month';
    const method = 'GET';
    Axios({ url, method }).then(res => {
    	this.setState({
    		menus: res.data,
    		loading: false
    	});
    }).catch(err => {
      console.error(err);
    })
	}

	renderListMenus(){
		const { menus } = this.state;
		if (menus.length)
		{
		return menus.map((menu) =>
				<tr key={menu._id}>
					<th>
						Month {new Date(menu.date).getMonth()+1} - 
						Day {new Date(menu.date).getDate()+1}
					</th>
					<th>{menu.dishes[0].name}</th>
				</tr>
			);
		}
	}

	render() {
		const { loading } = this.state;
		let listMenus = this.renderListMenus()
		return (
  		<div>
				{ loading ? <Loading /> : <Calendar listMenus={ listMenus } /> }
  		</div>
		);
	}
}

function Calendar(props) {
	return(
		<div>
			<AddMenuModal />
			<table class="table table-bordered">
				<thead class='thead-dark'>
					<tr>
						<th scope="col">Date</th>
						<th scope="col">Name</th>
					</tr>
				</thead>
				<tbody>
					{ props.listMenus }
				</tbody>
			</table>
		</div>
	)
}
