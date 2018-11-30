import React from "react"
import Style from "./style.sass"
import DishApi from '../../api/dish.js'

class SearchDish extends React.Component {
  constructor(props) {
    super()
    this.state = { handleBlur: props.handleBlur, handleChange: props.handleChange, value: '', foundDishes: [] }
    this.onChange = this.onChange.bind(this)
  }
  
  componentDidMount() {
    this.input.focus()
  }

  onChange() {
    this.setState({ value: event.target.value }, () => this.searchDish(this.state.value))
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
          onSelect={ console.log }
          placeholder="Delicius food">
        </input>
        <datalist id="suggestions" onSelect={ console.log }>
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
  }

  toggleSearchDish() {
    this.setState({
      showAddDish: !this.state.showAddDish
    })
  }

  renderDishes(dishes) {
    return dishes.map(dish => (<li key={ dish._id }>{ dish.name }</li>))
  }

  renderShowAddDish() {
    if (this.state.showAddDish) {
      return (<SearchDish handleBlur={ this.toggleSearchDish } />)
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
