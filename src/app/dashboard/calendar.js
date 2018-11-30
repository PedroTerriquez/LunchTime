import React, { Component } from "react"
import { Link } from 'react-router-dom'
import Loading from '../loading/loading.js'
import AddMenuModal from '../menu/add_menu.js'
import styles from '../../styles/site.sass'
import DayBox from '../dashboard/daybox.js'
import MenuApi from '../api/menu.js'
import Week from './week/index.js'
import Month from '../lib/month.js'

const currentDate = new Date()
const month = new Month({ month: currentDate.getMonth(), year: currentDate.getFullYear() })

export default class Dashboard extends Component {
	constructor() {
		super()
		this.state = {
			menus: [],
      weeks: month.weeks(true),
			loading: true
		}
	}

	componentDidMount() {
		this.getMenus()
	}

	getMenus() {
    MenuApi.monthMenus().then(menus => {
      const changedWeeks = this.state.weeks.map(week => {
        return week.map(day => {
          day.menu = menus.find(menu => {
            const date = new Date(menu.date)
            return date.getUTCDate() === day.day
          })
          return day
        })
      })
    	this.setState({
    		menus: menus,
        loading: false,
        weeks: changedWeeks
    	})
    }).catch(err => console.error(err))
	}

	swipeMenus(id,date){
		MenuApi.switch(id, { date }).then(res => {
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

  renderWeeks(weeks) {
    const today = new Date().getDate()
    return weeks.map((week, index) => {
      const isActive = week.find(day => day.day == today)
      if (week.length > 0) {
        return (
          <Week key={ index } days={ week } isHidden={ !isActive } />
        )
      }
    })
  }

	render() {
		const { loading } = this.state
		return (
  		<div>
				{ loading ? <Loading /> : <div>{ this.renderWeeks(this.state.weeks) }</div> }
  		</div>
		)
	}
}

function Calendar(props) {
	return(
		<div>
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
