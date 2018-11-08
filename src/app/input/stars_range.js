import React, { Component } from 'react'

export default class StarsRange extends Component {
	constructor(props){
		super(props)
	}

	render(){
		const { stars } = this.props
		return(
			<div>
				<p>{ stars }</p>
				<button type="button" className={ stars >= 1 ? "yellow":""} onClick={ () => { this.props.handleClick(1) } }> ★  </button>
				<button type="button" className={ stars >= 2 ? "yellow":""} onClick={ () => { this.props.handleClick(2) } }> ★  </button>
				<button type="button" className={ stars >= 3 ? "yellow":""} onClick={ () => { this.props.handleClick(3) } }> ★  </button>
				<button type="button" className={ stars >= 4 ? "yellow":""} onClick={ () => { this.props.handleClick(4) } }> ★  </button>
				<button type="button" className={ stars >= 5 ? "yellow":""} onClick={ () => { this.props.handleClick(5) } }> ★  </button>
			</div>
		)
	}
}
