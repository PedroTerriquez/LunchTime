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

  reload() {
    this.props.updateMenus()
  }

  onChange(dish_id) {
    if (this.props.id) {
      MenuApi.pushDish(this.props.id, { dishes: dish_id })
        .then(res => { this.reload() })
        .catch(err => console.log(err))
    } else {
      MenuApi.add({ dishes: dish_id, date: this.props.date })
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

	onDragStart(ev, id) {
		ev.dataTransfer.setData('id_from',id)
	}

	onDrop(ev, date, id){
		let idFrom = ev.dataTransfer.getData("id_from")
		let idTo = id
    if(idFrom != idTo){
      MenuApi.switch(idFrom, { idTo, date }).then(res => {
        this.reload()
      }).catch(err => console.error(err))
    }
	}

  render() {
    const { modal, handleAddDish } = this.state
    const { date, dishes, id } = this.props
    return (
      <div
        className={ Style.dayContainer }
        draggable
        onDragStart={ (e) => this.onDragStart(e, id) }
        onDragOver={ (e) => e.preventDefault() }
        onDrop={ (e) => this.onDrop(e, date, id) }>
        <DayCardHeader date={date}/>
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

const DayCardHeader = ({ date }) => {
  return(
  <div className={ Style.dayTitle }>
    <div className={ Style.dayNumber }>{ date.getUTCDate() }</div>
    <div className={ Style.dayName }>{ date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' }) }</div>
  </div>
  )
}
