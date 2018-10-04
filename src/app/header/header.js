import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styles from '../../styles/header.sass';

const Navigation = () => (
  <nav className={ styles.menu }>
		<Link to='/login'>
  		<button className="btn btn-primary">Login</button>
		</Link>
		<Link to='/'>
  		<button className="btn btn-primary">Calendar</button>
		</Link>
		<Link to='/dishes/all'>
  		<button className="btn btn-primary">Dishes</button>
		</Link>
	</nav>
);

const Profile = ({ name, img }) => (
  <div className={ styles.profile }>
  	<p className={ styles.profileName }>{ name }</p>
		<img src={ img } className={ styles.profileImage }></img>
	</div>
);

export default class Header extends Component {
	constructor() {
		super();
	}

	render() {
		return (
  		<section id="header" className={ styles.header }>
  			<div className={ styles.home } >
					<Link to='/'>
  					<img className={ styles.homeLogo } src='src/app/logo.png'></img>
  				</Link>
  			</div>
				<Navigation />
				<Profile name="Karla Villana" img="src/app/user.png" />
			</section>
		);
	}
}
