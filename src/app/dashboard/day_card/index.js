import React from "react"
import Style from "./style.sass"
import Month from '../../lib/month.js'
import DishApi from '../../api/dish.js'
import MenuApi from '../../api/menu.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'

class SearchDish extends React.Component {
  constructor(props) {
    super()
    this.state = { handleBlur: props.handleBlur, handleChange: props.handleChange, value: '', foundDishes: [] }
    this.onChange = this.onChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    this.input.focus()
  }

  onChange() {
    this.setState({ value: event.target.value }, () => this.searchDish(this.state.value))
  }

  handleKeyPress() {
    if (event.key !== 'Enter') { return }
    let index = this.state.foundDishes.findIndex(obj => obj.name === event.target.value)
    this.state.handleChange(this.state.foundDishes[index]._id)
  }

  searchDish(query) {
    DishApi.findBy({ name: query }).then((dishes) => {
			this.setState({ foundDishes: dishes })
		}).catch(err => {
			console.error(err)
		})
  }

  renderOptions() {
    return this.state.foundDishes.map(dish => (
      <option value={ dish.name } />
    ))
  }

  render() {
    const { handleChange, handleBlur, value } = this.state
    return (
      <div>
        <input
          onBlur={ handleBlur }
          onChange={ this.onChange }
          value={ value }
          ref={ input => this.input = input }
          type="text"
          list="suggestions"
          onKeyDown={ this.handleKeyPress }
          placeholder="Delicius food">
        </input>
        <datalist id="suggestions">
          { this.renderOptions() }
        </datalist>
    </div>
    )
  }
}

export default class DayCard extends React.Component {
  constructor(props) {
    super()
    this.state = {
      dayNumber: props.dayNumber,
      dayName: props.dayName,
      dishes: props.dishes,
      handleAddDish: props.handleAddDish,
      showAddDish: false,
      searchDishes: []
    }
    this.toggleSearchDish = this.toggleSearchDish.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  toggleSearchDish() {
    this.setState({
      showAddDish: !this.state.showAddDish
    })
  }

  getDate() {
    const current = new Date()
    return new Date(current.getFullYear(), current.getMonth(), this.props.dayNumber).toISOString()
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
      <div>
        <a onClick={ () => this.handleDelete(dish._id) } ><FontAwesomeIcon color='red' icon="trash"/></a>
        {' '}{ dish.name }
      </div>
    ))
  }

  renderShowAddDish() {
    if (this.state.showAddDish) {
      return (<SearchDish handleBlur={ this.toggleSearchDish } handleChange={ this.onChange }  />)
    } else {
      return (<span onClick={ this.toggleSearchDish } className={ Style.addDishButton }>Add a dish</span>)
    }
  }

  render() {
    const { dayNumber, dayName, dishes, handleAddDish } = this.state
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
      </div>
    )
  }
}
