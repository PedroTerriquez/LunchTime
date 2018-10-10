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

	ListMenus(){
		const { menus } = this.state;
		if (menus.length)	{
		return menus.map((menu) =>
				<tr key={menu._id}>
					<th>
						{new Date(menu.date).getMonth()+1} / {new Date(menu.date).getDate()+1}
					</th>
					<th>{menu.dishes[0] ? menu.dishes[0].name : "Dish Deleted"}</th>
				</tr>
			);
		}
	}

	render() {
		const { loading } = this.state;
		let listMenus = this.ListMenus()
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
			<Link to='/dishes/all'>
  			<button className="btn btn-primary">Dishes</button>
			</Link>
			<AddMenuModal />
			<table className="table table-bordered">
				<thead className='thead-dark'>
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
