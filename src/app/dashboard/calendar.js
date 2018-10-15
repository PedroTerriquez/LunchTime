import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Loading from '../loading/loading.js'
import AddMenuModal from '../menu/add_menu.js'
import styles from '../../styles/site.sass'
import Card from '../dashboard/card.js'

export default class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			menus: [],
			loading: true
		};
	}

	componentDidMount() {
		this.getMenus()
	}

	getMenus() {
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

	 async swipeMenus(id,id2,date1,date2){
		const id2NewDate = date1
		const id1NewDate = date2
		if(id != id2) {
			const a = await this.updateMenu(id2, '2000-01-01T00:00:00.000Z', false)
			console.log('a: ', a);
			const b = await this.updateMenu(id, id1NewDate)
			console.log('b: ', b);
			const c = await this.updateMenu(id2, id2NewDate)
			console.log('c: ', c);
			this.getMenus();
		}
	}

	async updateMenu(id,date){
		const request = {
			url: `https://islunchtime.herokuapp.com/api/menus/${id}`,
			method: 'PATCH',
			data: { date }
		}
		return await Axios(request).then(res => res).catch(err => err)
	}

	ListMenus(){
		const { menus } = this.state;
		if (menus.length)	{
		return menus.map((menu) =>
			<div key={menu._id}  className={ styles.gridItem }>
				<DayBox _id={ menu._id } name={menu.dishes[0] ? menu.dishes[0].name : "Dish Deleted"} date={menu.date} handleSwipe={this.swipeMenus.bind(this)} />
			</div>
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
  			<button className="btn btn-primary" style={{float: 'right'}}>Dishes</button>
			</Link>
			<h1>Calendar</h1>
			<div>
				<AddMenuModal />
				<div className={ styles.gridContainer }>
					{ props.listMenus }
				</div>
		</div>
	</div>
	)
}

class DayBox extends Component {
	constructor(){
		super()
	}

	onDragStart(ev,id, date) {
		ev.dataTransfer.setData('id_from',id)
		ev.dataTransfer.setData('date_from',date)
	}

	onDrop(ev,id,date){
		let idFrom = ev.dataTransfer.getData("id_from")
		let dateFrom = ev.dataTransfer.getData("date_from")
		let idTo = id
		let dateTo = date
		this.props.handleSwipe(idFrom,idTo,dateFrom,dateTo)
	}

	render() {
		const { _id,name,date } = this.props
		let month = 'Oct'
		let rate = Math.floor(Math.random() * 11) / 2;
		let day = new Date(date).getDate()+1
		return(
				<div
					className = { styles.boxDay }
					draggable
					onDragStart={ (e) => this.onDragStart(e, _id,date) }
					onDragOver={ (e) => e.preventDefault() }
					onDrop={ (e) => this.onDrop(e,_id,date) }>
					<Card day={ day } mes={ month } rate={ rate } name={ name } />
				</div>
		)
	}
}
