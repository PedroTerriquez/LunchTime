import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { Button, Nav, NavItem, NavLink, FormGroup, Label, Input} from 'reactstrap'
import Loading from '../loading/loading.js'
import AddDishModal from './dish_modal.js'
import Dish from './dish.js'
import styles from '../../styles/site.sass'
import DishApi from '../api/dish.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus, faSearch)

export default class DishesAll extends Component {
	constructor() {
		super()
		this.state = {
			dishes: [],
			results: [],
			loading: true,
			modal: false,
			active: "All",
			search: false,
			dish : {
				id: "",
				name: "",
				type: "",
				image: "",
				description: "",
				ingredients: ""
			}
		}
		this.editDishModal = this.editDishModal.bind(this)
		this.toggle = this.toggle.bind(this)
		this.fetchDishes = this.fetchDishes.bind(this)
		this.toggleSearchBar = this.toggleSearchBar.bind(this)
	}

	componentDidMount() {
		this.fetchDishes()
	}

	componentWillUnmount() {
		this.setState({
			dishes: [],
			results: [],
			loading: true
		})
	}

	fetchDishes() {
    DishApi.all().then(dishes => {
    	this.setState({
    		dishes: dishes,
    		results: dishes,
    		loading: false
    	})
    }).catch(err => {
      console.error(err)
    })
	}

	filterDishes(e, type){
		if (type == "All") {
			this.setState({
				results: this.state.dishes,
				active: "All"
			})
		}
		else {
		  let res = this.state.dishes.filter(dish => dish.type == type)
			this.setState({
				results: res,
				active: type
			})
		}
	}

	substringOf(str, substr) {
		if (substr === "") {
			this.setState({ search: false })
		}
		return (str.toUpperCase().indexOf(substr.toUpperCase()) > -1)
	}

	searchDish(event){
		let res = this.state.dishes.filter(dish => this.substringOf(dish.name, event.target.value))
		this.setState({results: res})
	}

	toggle() {
    this.setState({
    	dish : {
    		id: "",
    		name: "",
    		type: "",
    		image: "",
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

	editDishModal(id, name, type, image, description, ingredients) {
		this.setState({
			dish : {
				id: id,
				name: name,
				type: type,
				image: image,
				description: description,
				ingredients: ingredients
			},
			modal: true
		})
	}

	dishesElements() {
		const { results } = this.state
		if(Object.keys(results).length >= 1) {
			return results.map(dish => (
				<Dish
					key={ dish._id }
					id={ dish._id }
					name={ dish.name }
					image={ dish.image }
					description={ dish.description }
					ingredients={ dish.ingredients }
					handleDelete={ this.deleteDish.bind(this) }
					handleEdit={ () => this.editDishModal(dish._id, dish.name, dish.type, dish.image, dish.description, dish.ingredients) }
					/>
			))
		}
	}

	toggleSearchBar() {
		this.setState({ search: !this.state.search })
	}

	dishesList() {
		const { dish, modal, active, search } = this.state
		return (
			<div>
				<AddDishModal
					_id={ dish.id }
					name={ dish.name }
					type={ dish.type }
					image={ dish.image }
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
				<div className={ styles.cdTabFilterWrapper }>
          <Input
          	className={ search ? "" : styles.hide }
          	type="search" placeholder="search"
          	onChange={(e)=>this.searchDish(e)} 
          />
					<div className={ search ? styles.hide : styles.cdTabFilter }>
						<ul className={ styles.cdFilters }>
							<li
								className={ active == "All" ? styles.active : "" }
								onClick={(e)=> this.filterDishes(e, "All") }> All
							</li>
							<li
								className={ active == "Drinks" ? styles.active : "" }
								onClick={(e)=> this.filterDishes(e, "Drinks") }>Drinks</li>
							<li
								className={ active == "Starter" ? styles.active : "" }
								onClick={(e)=> this.filterDishes(e, "Starter") }>Starter</li>
							<li
								className={ active == "Side" ? styles.active : "" }
								onClick={(e)=> this.filterDishes(e, "Side") }>Side</li>
							<li
								className={ active == "Main Dish" ? styles.active : "" }
								onClick={(e)=> this.filterDishes(e, "Main Dish") }>Main Dish</li>
							<li
								className={ active == "Desserts" ? styles.active : "" }
								onClick={(e)=> this.filterDishes(e, "Desserts") }>Desserts</li>
							<li onClick={ this.toggleSearchBar }>
								<span> Search  </span>
								<FontAwesomeIcon
									icon="search"
								/>
							</li>
						</ul>
					</div>
				</div>

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
