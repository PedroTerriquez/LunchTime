import React from 'react'
import DayCard from '../day_card/day_card.js'
import Style from './week.sass'

export default class Week extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isHidden: props.initialStatus,
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  renderDayCards(days) {
    return days.map(day => {
      const dayMenu = day.menu || {}
      const date = day.date
      return (
        <DayCard
          key={ day.day }
          date = { date }
          dishes={ dayMenu.dishes || [] }
          id={ dayMenu._id }
          updateMenus={this.props.updateMenus}
        />
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
        <h3 className={ Style.weekName }>Week { this.props.days[0].week + 1 }
          <small className={ Style.toggleView } onClick={ this.handleToggle }>
            { this.state.isHidden ? '[ show ]' : '[ hide ]' }
          </small>
        </h3>
        <div className={ Style.weekDays }>
          { !this.state.isHidden && this.renderDayCards(this.props.days) }
      </div>
    </div>
    )
  }
}
