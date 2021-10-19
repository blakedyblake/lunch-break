import React from 'react'

const Filter = ({type,fn})=>{
    return (
        <div style={{textAlign:'left'}}>
                <input type="radio" id={type}value={type} name='restaurant-filter'onChange={e=>fn(e.target.value)}/>
                <label htmlFor={type}>{type}</label>
        </div>
    )
}

export default Filter