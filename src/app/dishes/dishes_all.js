import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import Loading from '../loading/loading.js'
import AddDishModal from './dish_modal.js'
import Dish from './dish.js'
import styles from '../../styles/site.sass'
import DishApi from '../api/dish.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus)

export default class DishesAll extends Component {
	constructor() {
		super()
		this.state = {
			dishes: [],
			loading: true,
			modal: false,
			dish : {
				id: "",
				name: "",
				description: "",
				ingredients: ""
			}
		}
		this.editDishModal = this.editDishModal.bind(this)
		this.toggle = this.toggle.bind(this)
		this.fetchDishes = this.fetchDishes.bind(this)
	}

	componentDidMount() {
		this.fetchDishes()
	}

	componentWillUnmount() {
		this.setState({
			dishes: [],
			loading: true
		})
	}

	fetchDishes() {
    DishApi.all().then(dishes => {
    	this.setState({
    		dishes: dishes,
    		loading: false
    	})
    }).catch(err => {
      console.error(err)
    })
	}

	toggle() {
    this.setState({
    	dish : {
    		id: "",
    		name: "",
    		description: "",
    		ingredients: ""
    	},
      modal: !this.state.modal
    })
    this.fetchDishes()
  }

	deleteDish(id) {
    DishApi.destroy(id).then(res => {
    	console.log("deleted")
    	console.log(res)
    	this.fetchDishes()
    }).catch(err => {
      console.error(err)
    })
	}

	editDishModal(id, name, description, ingredients) {
		this.setState({
			dish : {
				id: id,
				name: name,
				description: description,
				ingredients: ingredients
			},
			modal: true
		})
	}

	dishesElements() {
		const { dishes } = this.state
		if(Object.keys(dishes).length > 1) {
			return dishes.map(dish => (
				<Dish
					key={ dish._id }
					id={ dish._id }
					name={ dish.name }
					description={ dish.description }
					ingredients={ dish.ingredients }
					handleDelete={ this.deleteDish.bind(this) }
					handleEdit={ () => this.editDishModal(dish._id, dish.name, dish.description, dish.ingredients) }
					/>
			))
		}
	}

	dishesList() {
		const { dish, modal } = this.state
		return (
			<div>
				<AddDishModal
					_id={ dish.id }
					name={ dish.name }
					description={ dish.description }
					ingredients= { dish.ingredients }
					modal={ modal }
					toggle={this.toggle.bind(this)}
				/>
        <a href="#" className={styles.float} onClick={this.toggle}>
					<div className= {styles.myFloat}>
						<FontAwesomeIcon
							icon="plus"
						/>
					</div>
				</a>

        <div className={ styles.gridContainer}>
        	{ this.dishesElements() }
        </div>
			</div>
		)
	}

	render() {
		const { loading } = this.state
		return (
  		<div>
  			{ loading ? <Loading /> : this.dishesList()}
  		</div>
		)
	}
}
