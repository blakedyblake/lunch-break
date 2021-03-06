import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import BackButton from "../components/BackButton";
import CartRow from "../components/CartPage/CartRow";
import { GlobalContext } from "../Context/IdProvider";

const CartPage = ()=>{
    const {username} = useParams();
    const [cartData, setCartData] = useState(null)
    const [total, setTotal] = useState(0)
    const [isChanged, setChanged] = useState(false)
    const context = useContext(GlobalContext)
    if(context.user_id===0) window.location.href = 'https://main.d3h3garbunpjkz.amplifyapp.com/#/'

    useEffect(()=>{
        console.log('useEffect')
        //https://lb-server.herokuapp.com/
        axios.get(`https://lb-server.herokuapp.com/cart/getCart/${context.user_id}`).then(res=>{
            console.log(res.data)
            setCartData(res.data)
            console.log(res.data)
            let sum = 0;
            for(let i of res.data){
                sum+= i.price * i.quantity
            }
            setTotal(sum)
        })
        
        
    },[isChanged])
    
    const toPayment = ()=>{
        context.setTotal(total)
        window.location.href = `https://main.d3h3garbunpjkz.amplifyapp.com/#/pay/${username}/${total}`;
    }
    return cartData ?(
        <>  
            <div className='left-dark' style={{top:'-30px', zIndex:-4}}></div>
            <div className='right-dark' style={{top:'-30px'}}></div>

            <BackButton href={`https://main.d3h3garbunpjkz.amplifyapp.com/#/menu/${username}/${context.rest_id}/test`} style={{right:'70%'}}/>
            <h1 style={{marginBottom:'70px'}}>Cart Page</h1>
            <div className='cartlist'>
                {cartData.map((e,k)=>{
                    return <CartRow data={e} fn={setChanged}/>
                })}
            </div>
            
            <h3>Cart Total: ${total.toFixed(2)}</h3>
            <button onClick={toPayment}>Pay Now</button>
        </>
    ): <div className='loading'>Loading</div>
}
export default CartPage