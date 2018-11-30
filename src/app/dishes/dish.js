import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import styles from '../../styles/dish_card.sass'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faEdit, faClipboardCheck)

//let image = "http://www.superama.com.mx/views/micrositio/recetas/images/masbuscadas/enchiladasphiladelphia/Web_fotoreceta.jpg"

function clicked(e) {
	e.currentTarget.classList.toggle(styles.flipped) 
}

const noImage = 'https://vignette.wikia.nocookie.net/citrus/images/6/60/No_Image_Available.png/revision/latest?cb=20170129011325'

const Dish = ({ id, name, image, description, ingredients, handleDelete, handleEdit, handleReview }) => (
  <div className={styles.container} >
    <div className={styles.deck}>
      <div className={`${styles.card} ${styles.clickcard}`} onClick={(e) => clicked(e)}>
        <div className={`${styles.front} ${styles.face}`}>
          <div className={styles.foodNameContainer}>
            <h2 className={styles.foodName}>{name}</h2>
          </div>
          <div className={styles.foodImage} style={ { backgroundImage: `url("${ image || noImage }")` } }>
          </div>
        </div>
        <div className={`${styles.back} ${styles.face}`}>
          <h5 className={styles.title }> Description </h5>
          <p className={styles.smallText }>{description}</p>
          <h5 className={ styles.title }> Ingredients </h5>
          <p className={ styles.smallText }>{ingredients}</p>
          <div className={ styles.actions }>
            <h5 className={ styles.title }>Actions</h5>
            <Button color="danger" onClick={ (event) => handleDelete(id) }>
              <FontAwesomeIcon
                icon="trash"
              />
            </Button>
            <Button color="success" onClick={ handleEdit }>
              <FontAwesomeIcon
                icon="edit"
              />
            </Button>
            <Button color="warning" onClick={ handleReview}>
              <Link to={`dishes/${id}/review`}>
                <FontAwesomeIcon
                  icon="clipboard-check"
                />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Dish
