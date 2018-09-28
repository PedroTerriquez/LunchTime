import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styles from '../../styles/header.sass';

const Navigation = () => (
  <nav className={ styles.menu }>
		<Link to='/menus/new'>
  		<button className="btn btn-primary">Add menu </button>
		</Link>
		<Link to='/login'>
  		<button className="btn btn-primary">Login </button>
		</Link>
		<Link to='/'>
  		<button className="btn btn-primary">Dashboardsin</button>
		</Link>
		<Link to='/dishes/new'>
  		<button className="btn btn-primary">CRUD vergas</button>
		</Link>
		<Link to='/dishes/review'>
  		<button className="btn btn-primary">review</button>
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
  				<img className={ styles.homeLogo } src='src/app/logo.png'></img>
  			</div>
				<Navigation />
				<Profile name="John" img="src/app/user.png" />
			</section>
		);
	}
}
