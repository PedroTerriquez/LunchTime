import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styles from '../../styles/header.sass';

const Navigation = () => (
  <nav className={ styles.menu }>
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
				<Profile name="Karla" img="src/app/user.png" />
			</section>
		);
	}
}
