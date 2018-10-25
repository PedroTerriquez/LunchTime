import React,  {Component} from 'react'
const Textarea =({rows, cols, value, id, handleChange, labelFor}) => (
    <div>
        <div> { labelFor }: </div>
        <textarea
            rows={ rows }
            cols={ cols }
            id={ id }
            onChange={ handleChange }
            value={ value }
        />
    </div>
)

export default Textarea
