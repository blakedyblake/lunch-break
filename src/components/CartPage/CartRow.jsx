import React, { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react/cjs/react.development';
import { GlobalContext } from '../../Context/IdProvider';

const CartRow = ({data, fn})=>{
    const {id, quantity, restaurant, name, url,price} = data;
    const [isHidden, setHidden] = useState(true)
    const {user_id} = useContext(GlobalContext)
    const [currQuantity, setCurrQuantity] = useState(quantity)
    const description="";
    const span_id = `span-${id}`;

    const removeFromCart = ()=>{
        console.log('Hello');
        axios.delete(`http://localhost:5000/cart/${id}`).then((res)=>{
            console.log(res.status)
            console.log('From the other side')
            fn(Math.random())
        }).catch(err=>console.error(err))
    }
    const ToSelect = ()=>{
        let span = document.getElementById(span_id)
        span.innerText = ``
        setHidden(false)
        

    }
    const updateValue = ()=>{
        let span = document.getElementById(span_id)
        span.innerText = `${currQuantity}`
        setHidden(true)

        //Axios call to edit the value
        axios.put(`http://localhost:5000/cart/${user_id}/${id}/${currQuantity}`).then(()=>{})
        .catch(err=>console.error(err))

    }
    return(
        <section style={{display:'flex', flexDirection:'row', paddingBottom:'40px',
            borderBottom:'#c4c4c4 solid 1px'
        }}>
            <div className='cartIcon' style={{
                background: 'url('+url+')', 
                borderRadius: '50%',
                width:'150px',
                height:'150px',
                marginTop:'1%'
            }}/>
            <section style={{display:'flex', flexDirection:'column', flexGrow:2}}>
                <h2>{restaurant}: {name}</h2>
                <p>{description}</p>
                <h2>{price} * <span style={{cursor:'pointer'}} id={span_id} onClick={ToSelect}>{quantity}</span> 
                    <input onMouseLeave={updateValue} onChange={e=>setCurrQuantity(e.target.value)} 
                        type='number' min={0} defaultValue={quantity} id={`input-${span_id}`} hidden={isHidden}/> = 
                            {(price* currQuantity).toFixed(2)}</h2>

            </section>
            <section style={{display:'flex', flexDirection:'column'}}>
                <div onClick={removeFromCart} style={{backgroundColor:'red', height:'15px', width:'50px', marginTop:'100%',marginRight:'30px', cursor:'pointer'}}></div>
            </section>
        </section>
    )
}
export default CartRow;