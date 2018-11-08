import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

let image = "http://www.superama.com.mx/views/micrositio/recetas/images/masbuscadas/enchiladasphiladelphia/Web_fotoreceta.jpg"

const Dish = ({ id, name, description, ingredients, handleDelete, handleEdit, handleReview }) => (
	<div>
    <Card style={{minHeight:'500px', maxHeight:'500px'}}>
      <CardImg top src={image} alt="Card image cap" />
      <CardBody style={{overflow: 'auto'}}>
        <CardTitle>{ name }</CardTitle>
        <CardSubtitle>{ description }</CardSubtitle>
        <CardText>{ ingredients }</CardText>
        <Button color='danger' onClick={ (event) => handleDelete(id) }>Delete</Button>
        <Button color='success' onClick={ handleEdit }>Edit</Button>
				<Link to={ `/dishes/${id}/review` }>
        	<Button color='warning' onClick={ handleReview}>Review</Button>
				</Link>
      </CardBody>
    </Card>
  </div>
)

export default Dish
