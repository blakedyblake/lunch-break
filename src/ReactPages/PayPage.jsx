import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const PayPage = ()=>{
    const [realName, setRealName] = useState('');
    const [address, setAddress] = useState('')
    const [payType, setPayType] = useState('')
    const [cardNumber, setCardNumber] = useState(0);
    const [SSC, setSSC] = useState(0)
    const [zipCode, setZipCode] = useState(0)
    const [expDate, setExpDate] = useState('')
    const [deliveryDate, setDeliveryDate] = useState('')
    const {userid,total} = useParams()
    const [cartArr, setCartArr] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:5000/cart/getCart/${userid}`).then(res=>{
            setCartArr(res.data)
            console.log(res.data)
        })
    },[])
    const Submit = ()=>{
        
        const obj = {
            total,
            userid,
            realName,
            address,
            payType,
            cardNumber,
            SSC, 
            zipCode,
            expDate,
            deliveryDate,
            cartArr
        }
        axios.post('http://localhost:5000/pay', obj).then((res)=>{
            //This post will create a cart list to send to an employee
            //The cart list will have a link to a table of confirmed purchases
            // The users current cart will be reduced to 0
        }).catch(err=> console.error(err))
    }
    return (
        <>
            <h1>Make Payment</h1>
            <fieldset style={{width:'30%', marginLeft:'35%'}}>
                <legend>Form</legend>
                <section style={{display:'flex', flexDirection:'row'}}>
                    <section style={{marginRight:'20%'}}>

                        <input type="text" placeholder={"name"} onChange={e=>setRealName(e.target.value)}/><br/>
                        <input type="text" placeholder='address' onChange= {e=>setAddress(e.target.value)}/><br/>
                        <input type="radio" id="credit" value='credit' name='payment_type' onClick={e=>setPayType('Credit')}/>
                        <label htmlFor="credit">Credit</label>
                        <input type="radio" id="debit" value='debit' name='payment_type' onClick={e=>setPayType('Debit')}/>
                        <label htmlFor="debit">Debit</label>
                        <br/>
                        <input type="password" placeholder='Card Number' onChange={e=>setCardNumber(+e.target.value)}/><br/>
                        <input type="password" placeholder='securirity code' onChange={e=>setSSC(+e.target.value)}/><br/>
                        <input type="text" placeholder='card experation date' onChange={e=>setExpDate(e.target.value)}/><br/>
                        <input type="text" placeholder='Card Zip Code' onChange={e=>setZipCode(+e.target.value)}/><br/>
                        <input type='text' placeholder='Time of Lunch Break' onChange={e=>setDeliveryDate(e.target.value)}/>
                    </section>
                
                <button onClick={Submit} style={{flexGrow:4}}>Pay</button>
                </section>
            </fieldset>
        </>
    )
}
export default PayPage