import React from 'react'
import DishApi from '../../api/dish.js'

export default class SearchDish extends React.Component {
  constructor(props) {
    super()
    this.state = { value: '', foundDishes: [] }
    this.onChange = this.onChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    this.input.focus()
  }

  onChange() {
    this.setState({ value: event.target.value }, this.searchDish(this.state.value))
  }

  handleKeyPress() {
    if (event.key !== 'Enter') { return }
    let index = this.state.foundDishes.findIndex(obj => obj.name === event.target.value)
    if (index === -1) {
      this.props.toggleAddDish()
      return
    }
    this.props.handleChange(this.state.foundDishes[index]._id)
    this.setState({value: ''})
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
      <option key={ dish._id } value={ dish.name } />
    ))
  }

  render() {
    const { handleChange, handleBlur} = this.props
    return (
      <div>
        <input
          onBlur={ handleBlur }
          onChange={ this.onChange }
          value={ this.state.value }
          ref={ input => this.input = input }
          type="text"
          list="suggestions"
          onKeyDown={ this.handleKeyPress }
          placeholder="Delicious food">
        </input>
        <datalist id="suggestions">
          { this.renderOptions() }
        </datalist>
    </div>
    )
  }
}

