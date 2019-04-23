import React from 'react'
import Style from './day_card.sass'
import SearchDish from './search_dish.js'
import Month from '../../lib/month.js'
import MenuApi from '../../api/menu.js'
import AddDishModal from '../../dishes/dish_modal.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'

export default class DayCard extends React.Component {
  constructor(props) {
    super()
    this.state = {
      handleAddDish: props.handleAddDish,
      showAddDish: false,
      modal: false,
      searchDishes: []
    }
    this.toggleSearchDish = this.toggleSearchDish.bind(this)
    this.toggleAddDish = this.toggleAddDish.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  toggleSearchDish() {
    this.setState({ showAddDish: !this.state.showAddDish })
  }

  toggleAddDish() {
    this.setState({modal: !this.state.modal})
  }

  getDate() {
    const current = new Date()
    return new Date(current.getFullYear(), current.getMonth(), this.props.dayNumber).setUTCHours(0,0,0,0)
  }

  reload() {
    //TODO Avoid reload, I really sorry for this
    window.location.reload()
  }

  onChange(dish_id) {
    if (this.props.id) {
      MenuApi.pushDish(this.props.id, { dishes: dish_id })
        .then(res => { this.reload() })
        .catch(err => console.log(err))
    } else {
      MenuApi.add({ dishes: dish_id, date: this.getDate() })
        .then(res => { this.reload() })
        .catch(err => console.log(err))
    }
  }

  handleDelete(dish_id) {
    MenuApi.pullDish(this.props.id, { dishes: dish_id })
      .then(res => { this.reload() })
      .catch(err => console.log(err))
  }

  renderDishes(dishes) {
    return dishes.map(dish => (
      <div key={ dish._id } >
        <a onClick={ () => this.handleDelete(dish._id) } ><FontAwesomeIcon color='red' icon="trash"/></a>
        {` ${dish.name}` }
      </div>
    ))
  }

  renderShowAddDish() {
    if (this.state.showAddDish) {
      return (<SearchDish handleBlur={ this.toggleSearchDish } handleChange={ this.onChange } toggleAddDish={ this.toggleAddDish } />)
    } else {
      return (<span onClick={ this.toggleSearchDish } className={ Style.addDishButton }>Add a dish</span>)
    }
  }

  render() {
    const { modal, handleAddDish } = this.state
    const { dayNumber, dayName, dishes } = this.props
    return (
      <div className={ Style.dayContainer }>
        <div className={ Style.dayTitle }>
          <div className={ Style.dayNumber }>{ dayNumber }</div>
          <div className={ Style.dayName }>{ dayName }</div>
        </div>
        <div className={ Style.dayDishes }>
          <ul className={ Style.dayDishesList }>
            { this.renderDishes(dishes) }
          </ul>
          <div className={ Style.addDish }>
            { this.renderShowAddDish() }
          </div>
        </div>
				<AddDishModal
					modal={ modal }
					toggle={this.toggleAddDish.bind(this)}
				/>
      </div>
    )
  }
}
