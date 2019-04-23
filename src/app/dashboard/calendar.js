import React, { Component } from "react"
import { Link } from 'react-router-dom'
import Loading from '../loading/loading.js'
import styles from '../../styles/site.sass'
import DayBox from '../dashboard/daybox.js'
import MenuApi from '../api/menu.js'
import Week from './week/week.js'
import Month from '../lib/month.js'

const currentDate = new Date()
const month = new Month({ month: currentDate.getMonth(), year: currentDate.getFullYear() })

export default class Calendar extends Component {
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

	//swipeMenus(id,date){
		//MenuApi.switch(id, { date }).then(res => {
      //this.getMenus()
    //}).catch(err => console.error(err))
	//}

  renderWeeks(weeks) {
    const today = new Date().getDate()
    return weeks.map((days_week, index) => {
      const isActive = days_week.find(day => day.day == today)
      if (days_week.length > 0) {
        return (
          <Week key={ index } days={ days_week } initialStatus={ !isActive } />
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
