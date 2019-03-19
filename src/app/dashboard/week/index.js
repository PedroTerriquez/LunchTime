import React from "react"
import DayCard from "../day_card/index.js"
import Style from "./style.sass"

export default class Week extends React.Component {
  constructor(props) {
    super()
    this.state = {
      days: props.days,
      isHidden: props.isHidden,
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  renderDayCards(days) {
    return days.map(day => {
      const dayMenu = day.menu || {}
      const date = day.date
      return (
        <DayCard
          className= { Style.week }
          key={ day.day }
          dayNumber={ date.getUTCDate() }
          dayName={ date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' }) }
          dishes={ dayMenu.dishes || [] }
          id={ dayMenu._id } />
      )
    })
  }

  handleToggle() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  render() {
    return (
      <div className={ Style.weekContainer }>
        <h3 className={ Style.weekName }>Week { this.state.days[0].week + 1 }<small className={ Style.toggleView } onClick={ this.handleToggle }>{ this.state.isHidden ? '[ show ]' : '[ hide ]' }</small></h3>
        <div className={ Style.weekDays }>
          { !this.state.isHidden && this.renderDayCards(this.state.days) }
      </div>
    </div>
    )
  }
}
