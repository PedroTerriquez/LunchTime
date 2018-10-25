import React, { Component } from "react"
import Input from '../input/input.js'
import Textarea from '../input/textarea.js'

export default class Review extends Component {
	constructor({ match }) {
		super()
		this.state = {
			rate: '',
			comment: '',
			dish_id: ''
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	handleSubmit(event){
		event.preventDefault()
		const { dish_id, rate, comment } = this.state
    const url = `https://islunchtime.herokuapp.com/api/dishes/${dish_id}/reviews`;
    const method = 'POST'
    Axios({ url, method, data: { rate, comment }})
    	.then(res => { console.log(res) })
    	.catch(err => { console.error(err) })
	}

	render(){
		const { rate, comment } = this.state
		return (
  		<div>
  			<h1> My opinion about FOODNAME </h1>
  			<Input labelfor="Rate 0-5" type="number" value={ rate } id='rate' handleChange={this.handleChange}/>
				<Textarea labelFor="Your opinion here" value={ comment } id='comment' rows='4' cols='20' handleChange={this.handleChange}/>
				<button>Cancel</button>
				<button>Submit</button>
 			</div>
		)
	}
}
