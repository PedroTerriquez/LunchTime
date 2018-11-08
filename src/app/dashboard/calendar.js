import React, { Component } from "react"
import { Link } from 'react-router-dom'
import Loading from '../loading/loading.js'
import AddMenuModal from '../menu/add_menu.js'
import styles from '../../styles/site.sass'
import DayBox from '../dashboard/daybox.js'
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
    }).catch(err => console.error(err))
	}

	listMenus(){
		const { menus } = this.state
		if (menus.length)	{
			return menus.map((menu) =>
				<div key={ menu._id }  className={ styles.gridItem }>
					<DayBox
						_id={ menu._id }
						//TODO Delete Menu if DISH is deleted
						name={menu.dishes[0] ? menu.dishes[0].name : "Dish Deleted"}
						date={menu.date}
						handleSwipe={this.swipeMenus.bind(this)}
					/>
				</div>
			)
		}
	}

	render() {
		const { loading } = this.state
		return (
  		<div>
				{ loading ? <Loading /> : <Calendar listMenus={ this.listMenus() } /> }
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

