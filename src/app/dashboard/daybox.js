import React, { Component } from 'react'
import styles from '../../styles/site.sass'
import Card from '../dashboard/card.js'

export default class DayBox extends Component {
	constructor(){
		super()
	}

	onDragStart(ev, id) {
		ev.dataTransfer.setData('id_from',id)
	}

	onDrop(ev, date, _id){
		let idFrom = ev.dataTransfer.getData("id_from")
		let dateTo = date
		if(idFrom != _id){
			this.props.handleSwipe(idFrom, dateTo)
		}
	}

	render() {
		const { _id, name, date } = this.props
		//TODO USE ADRIAN'S DATE LIBRARY
		let month = 'Oct'
		let rate = Math.floor(Math.random() * 11) / 2
		let day = new Date(date).getDate()+1
		return(
				<div
					className = { styles.boxDay }
					draggable
					onDragStart={ (e) => this.onDragStart(e, _id) }
					onDragOver={ (e) => e.preventDefault() }
					onDrop={ (e) => this.onDrop(e, date, _id) }>
					<Card day={ day } mes={ month } rate={ rate } name={ name } />
				</div>
		)
	}
}
