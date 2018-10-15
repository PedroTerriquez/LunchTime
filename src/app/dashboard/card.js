import React, { Component } from 'react';
import styles from '../../styles/card.sass'
const Card = ({ day, mes, rate, name }) => (
	<div className={ styles.calendarCard}>
  	<div className={`${ styles.cardItem } ${ styles.cardDay}`}>
    	<h1>{ day }</h1>
  	</div>
  	<div className={`${ styles.cardItem} ${ styles.cardMonth}`}>
    	<h2>{ mes }</h2>
  	</div>
  	<div className={`${ styles.cardItem} ${ styles.cardMenu}`}>
    	<h3>{ name }</h3>
  	</div>
  	<div className={`${ styles.cardItem} ${ styles.cardRate}`}>
    	<h4>Rate { rate }</h4>
  	</div>
	</div>
);

export default Card;
