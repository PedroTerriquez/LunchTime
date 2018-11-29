import React, { Component } from "react"
import { Form, FormGroup, Label, Input, FormFeedback, Col, Button } from 'reactstrap';
import Textarea from '../input/textarea.js'
import StarsRange from '../input/stars_range.js'
import DishApi from '../api/dish.js'

export default class Review extends Component {
	constructor({ match }) {
		super()
		this.state = {
			redirect: false,
			comment: '',
			stars: '',
			dish_id: match.params.id,
			dish: {}
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount(){
		DishApi.find(this.state.dish_id)
			.then(dish => {
				console.log(dish)
				this.setState({dish})
			}).catch()
	}

	handleChange(event){
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	handleRange(number){
		this.setState({stars: number})
	}

	handleSubmit(event){
		event.preventDefault()
		const { dish_id, rate, comment } = this.state
    DishApi.addReview(dish_id, { rate, comment })
    	.then(res => {
    		console.log(res)
    		this.setState({redirect: true})
    	})
    	.catch(err => { console.error(err) })
	}

	render(){
		const { redirect, stars, comment, dish } = this.state
		if (redirect) {
			return <Redirect exact to='/' />
		}
		return (
  		<div>
      <Form>
  			<h1> { dish.name }</h1>
  			<h3> Feel free to share with us your opinión about this food. </h3>
      	<FormGroup>
        	<Label>Your comments here:</Label>
        	<StarsRange stars={ stars } handleClick={ this.handleRange.bind(this) }/>
          <Input type="textarea" name="text" id="comment" value={ comment } onChange={this.handleChange} />
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10 }}>
            <Button>Back</Button>
            <Button onClick={ this.handleSubmit }>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
 			</div>

		)
	}
}
