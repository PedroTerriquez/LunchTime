import React,  {Component} from 'react';
const Textarea =({rows, cols, value, id, handleChange}) => (
    <div>
        <div> { id }: </div>
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