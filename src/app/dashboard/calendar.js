import React, { Component } from "react"
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Loading from '../loading/loading.js'
import AddMenuModal from '../menu/add_menu.js'
import styles from '../../styles/site.sass'
import Card from '../dashboard/card.js'
import Menu from '../api/menu.js'

export default class Dashboard extends Component {
	constructor() {
		super()
		this.state = {
			menus: [],
			loading: true
		}
	}

	componentDidMount() {
		this.getMenus()
	}

	getMenus() {
    Menu.monthMenus().then(menus => {
    	this.setState({
    		menus: menus,
    		loading: false
    	})
    }).catch(err => console.error(err))
	}

	swipeMenus(id,date){
		Menu.switch(id, { date }).then(res => {
    	this.getMenus()
    	console.log(res)
    }).catch(err => console.error(err))
	}

	ListMenus(){
		const { menus } = this.state
		if (menus.length)	{
		return menus.map((menu) =>
			<div key={menu._id}  className={ styles.gridItem }>
				<DayBox _id={ menu._id } name={menu.dishes[0] ? menu.dishes[0].name : "Dish Deleted"} date={menu.date} handleSwipe={this.swipeMenus.bind(this)} />
			</div>
			)
		}
	}

	render() {
		const { loading } = this.state
		let listMenus = this.ListMenus()
		return (
  		<div>
				{ loading ? <Loading /> : <Calendar listMenus={ listMenus } /> }
  		</div>
		)
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

	onDragStart(ev, id) {
		ev.dataTransfer.setData('id_from',id)
	}

	onDrop(ev, date, _id){
		let idFrom = ev.dataTransfer.getData("id_from")
		let dateTo = date
		if(idFrom != _id){
			this.props.handleSwipe(idFrom, dateTo)
		}
	}

	render() {
		const { _id, name, date } = this.props
		let month = 'Oct'
		let rate = Math.floor(Math.random() * 11) / 2
		let day = new Date(date).getDate()+1
		return(
				<div
					className = { styles.boxDay }
					draggable
					onDragStart={ (e) => this.onDragStart(e, _id) }
					onDragOver={ (e) => e.preventDefault() }
					onDrop={ (e) => this.onDrop(e, date, _id) }>
					<Card day={ day } mes={ month } rate={ rate } name={ name } />
				</div>
		)
	}
}
