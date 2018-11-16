import React, { Component } from "react"
import { Link } from 'react-router-dom'
import styles from '../../styles/header.sass'
import LogoImage from '../logo.png'
import UserImage from '../user.png'

export default class Header extends Component {
	constructor() {
		super()
	}

	render() {
		return (
  		<header className={ `row align-items-center ${styles.header}` }>
				<div className={`col-2 ${styles.logo}`}>
			    <h2>Lunch Time</h2>
			  </div>
			  <div className={`col-3 offset-5 ${styles.menu}`}>
			    <nav>
			      <ul>
						  <li>
			      		<Link to='/dishes/all'> Dishes
			          </Link>
							</li>
			        <li>
								<Link to='/'> Daily Menu
			      		</Link>
							</li>
			      </ul>
			    </nav>
			  </div>
			  <div className={`col-2 ${styles.user}`}>
			    Karla Pandilla
			    <small>
			      <span className={ styles.signOut }>Sign out</span>
			    </small>
			  </div>
			</header>
		)
	}
}
