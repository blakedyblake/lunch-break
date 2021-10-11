import React from 'react'
import axios from 'axios';
const CartRow = ({data, fn})=>{
    const {id, quantity, restaurant, name, url,price} = data;
    const description="";
    const removeFromCart = ()=>{
        axios.delete(`http://localhost:5000/cart/${id}`).then((res)=>{
            window.location.reload()
            fn(true)
        }).catch(err=>{console.error(err)})
        
    }
    return(
        <section style={{display:'flex', flexDirection:'row'}}>
            <div style={{
                background: 'url('+url+')', 
                borderRadius: '50%',
                width:'200px',
                height:'200px'
            }}/>
            <section style={{display:'flex', flexDirection:'column', flexGrow:2}}>
                <h2>{restaurant}: {name}</h2>
                <p>{description}</p>
                <h2>{price} * {quantity} = {price* quantity}</h2>
            </section>
            <section style={{display:'flex', flexDirection:'column'}}>
                <button onClick={removeFromCart}>Delete From Cart</button>
            </section>
        </section>
    )
}
export default CartRow;