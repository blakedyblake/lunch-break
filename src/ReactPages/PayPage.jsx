import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useContext } from "react/cjs/react.development";
import BackButton from "../components/BackButton";
import { GlobalContext } from "../Context/IdProvider";

const PayPage = ()=>{
    const [realName, setRealName] = useState('');
    const [address, setAddress] = useState('')
    const [payType, setPayType] = useState('')
    const [cardNumber, setCardNumber] = useState(0);
    const [SSC, setSSC] = useState(0)
    const [zipCode, setZipCode] = useState(0)
    const [expDate, setExpDate] = useState('')
    const [deliveryDate, setDeliveryDate] = useState('')
    const [cartArr, setCartArr] = useState([])
    const {user_id,total} = useContext(GlobalContext)
    const {username} = useParams()

    //if(user_id===0) window.location.href = 'http://localhost:3000/'
    const [changed, setChanged] = useState(0)
    useEffect(()=>{
        axios.get(`http://localhost:5000/cart/getCart/${user_id}`).then(res=>{
            setCartArr(res.data)
            console.log(res.data)
        })
        setRealName('')
        setAddress('')
        setPayType('')
        setCardNumber(0)
    },[])

    const Submit = ()=>{
        
        const obj = {
            total,
            user_id,            realName,
            address,            payType,
            cardNumber,            SSC, 
            zipCode,            expDate,
            deliveryDate,            cartArr
        }
        axios.post('http://localhost:5000/pay', obj).then((res)=>{
            
            window.location.href = `http://localhost:3000/#/success/${username}`

        }).catch(err=> console.error(err)).finally(()=>{setChanged(changed + 1)})
        
    }
    const [nameErr, setNameErr]=useState('')
    const handleName = (event)=>{
        setRealName(event.target.value)
        let regex = /^A-Za-z+\s A-Za-z+$/;
        
        setNameErr(regex.test(event.target.value)?'':'First and Last name, please')
    }
    
    return (
        <>  
            <BackButton href={`http://localhost:3000/#/cart/${username}`} style={{left:'330px'}}></BackButton>
            <h1>Make Payment</h1>
            <fieldset style={{width:'30%', marginLeft:'35%'}}>
                <legend>Form</legend>
                <section style={{display:'flex', flexDirection:'row'}}>
                    <section style={{marginRight:'20%'}}>

                        <input defaultValue={realName} className='textInput' type="text" placeholder={"name"} onChange={handleName}/><br/>
                        <p className="error">{}</p>
                        <input defaultValue={address} className='textInput' type="text" placeholder='address' onChange= {e=>setAddress(e.target.value)}/><br/>
                        
                        <input type="radio" id="credit" value='credit' name='payment_type' onClick={e=>setPayType('Credit')}/>
                        <label htmlFor="credit">Credit</label>
                        <input type="radio" id="debit" value='debit' name='payment_type' onClick={e=>setPayType('Debit')}/>
                        <label htmlFor="debit">Debit</label>
                        <br/>
                        <input defaultValue='' className='textInput' type="password" placeholder='Card Number' onChange={e=>setCardNumber(+e.target.value)}/><br/>
                        <input defaultValue='' className='textInput' type="password" placeholder='securirity code' onChange={e=>setSSC(+e.target.value)}/><br/>
                        <input defaultValue='' className='textInput' type="text" placeholder='card experation date' onChange={e=>setExpDate(e.target.value)}/><br/>
                        <input defaultValue='' className='textInput' type="text" placeholder='Card Zip Code' onChange={e=>setZipCode(+e.target.value)}/><br/>
                        <input defaultValue='' className='textInput' type='text' placeholder='Time of Lunch Break' onChange={e=>setDeliveryDate(e.target.value)}/>
                    </section>
                
                    <button style={{cursor:'pointer', flexGrow:4}}onClick={Submit}>Pay</button>
                </section>
            </fieldset>
            <p>Note: this is a practice webPage. Please do not enter your real payment information.</p>
        </>
    )
}
export default PayPage