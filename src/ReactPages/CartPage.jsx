import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CartRow from "../components/CartPage/CartRow";

const CartPage = ()=>{
    const {userid ,username} = useParams();
    const [cartData, setCartData] = useState([])
    const [total, setTotal] = useState(0)
    const [isDeleted, setIsDeleted] = useState(false)


    useEffect(()=>{
        axios.get(`http://localhost:5000/cart/getCart/${userid}`).then(res=>{
            setCartData(res.data)
            let sum = 0;
            for(let i of res.data){
                sum+= i.price * i.quantity
            }
            setTotal(sum)
        })
        setIsDeleted(false);
        
    },[isDeleted])
    
    const reload = ()=>{window.location.reload()}
    const toPayment = ()=>{
        window.location.href = `http://localhost:3000/pay/${userid}/${username}/${total}`;
    }
    return cartData.length> 0 ?(
        <>  
            <button onClick={e=>reload()}>Dummy</button>
            <h1>Cart Page</h1>
            {cartData.map((e,k)=>{
                return <CartRow data={e} fn={setIsDeleted}/>
            })}
            <h3>Cart Total: {total}</h3>
            <button onClick={toPayment}>Pay Now</button>
        </>
    ): <div className='loading'>Loading</div>
}
export default CartPage