import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import BackButton from "../components/BackButton";
import { GlobalContext } from "../Context/IdProvider";


const PayPage = ()=>{
    //Necessary Payment Data
    const [realName, setRealName] = useState('');
    const [address, setAddress] = useState('')
    const [payType, setPayType] = useState('')
    const [cardNumber, setCardNumber] = useState(0);
    const [SSC, setSSC] = useState(0)
    const [zipCode, setZipCode] = useState(0)
    const [expDate, setExpDate] = useState('')
    const [deliveryDate, setDeliveryDate] = useState('')
    const [cartArr, setCartArr] = useState([])

    //Data from Context and Params
    const {user_id,total} = useContext(GlobalContext)
    const {username} = useParams()

    //Refreshing the page causes the site to drop the user id from context, making it necessary to have the user resign in. Transition to Session data later on
    if(user_id===0) window.location.href = 'https://main.d3h3garbunpjkz.amplifyapp.com/#/'
    

    const [changed, setChanged] = useState(0)
    useEffect(()=>{
        //https://lb-server.herokuapp.com/
        axios.get(`https://lb-server.herokuapp.com/cart/getCart/${user_id}`).then(res=>{
            setCartArr(res.data)
            console.log(res.data)
        })
        setRealName('')
        setAddress('')
        setPayType('')
        setCardNumber(0)
    },[])


    //validation messages:
    const [nameErr, setNameErr] = useState('')
    const [credNumErr, setCredNumErr] = useState('')
    const [codeErr, setCodeErr] = useState('')
    const [typeErr,setTypeErr] = useState('')
    const [zipErr, setZipErr] = useState('')



    //Function for sending payment data 
    const Submit = ()=>{
        
        const obj = {
            total,              user_id,        realName,
            address,            payType,        cardNumber,              SSC, 
            zipCode,            expDate,        deliveryDate,            cartArr
        }

        const alertMessage='Fix Errors before submitting'
        //Prevent Submission if there are error messages
  
        if(codeErr !==''||credNumErr!==''||codeErr!=='' || zipErr!=='' ||payType===''){
            setTypeErr(payType===''?'Choose Payment Type':'')
            alert(alertMessage)
        }
        else{
            //Go to the server and make the changes 
            
            //https://lb-server.herokuapp.com/
            axios.post('https://lb-server.herokuapp.com/pay', obj).then((res)=>{
                //Upon success the user goes to a simple success page
                window.location.href = `https://main.d3h3garbunpjkz.amplifyapp.com/#/success/${username}`
    
            }).catch(err=> console.error(err)).finally(()=>{setChanged(changed + 1)})
        }


        
    }

    ///////////////////////////////////////////////Validation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //Name Validation
    const handleName = (event)=>{
        setRealName(event.target.value)
        let regex = /^[a-zA-Z]+ [a-zA-z]+$/;  
        setNameErr(regex.test(event.target.value)===true ?'':'First and Last name, with a space between')
    }

    //Credit Debit Card Validation
    const handleCredit = (e)=>{
        setCardNumber(+e.target.value)
        let regexTest = /^\d{16}$/.test(e.target.value)
        setCredNumErr(regexTest?'':'Enter a valid Credit/Debit Card')
    }

    //SSC Code Validtion
    const handleSSC = (e)=>{
        setSSC(+e.target.value)
        let regexTest = /^\d{3,4}$/.test(e.target.value)
        setCodeErr(regexTest?'' : '3-4 digits, please')
    }

    //Pay type Validation
    const handleType = (e)=>{
        const {value} = e.target
        setPayType(value) //Setting it to e.target.value gave off an error. Not so sure why...
        setTypeErr('')
    }

    //Zip Code Validation
    const handleZip = (e)=>{
        setZipCode(+e.target.value)
        let regexTest = /^\d{5,6}$/.test(e.target.value)
        setZipErr(regexTest?'':'Enter valid zip code')

    }

    //Fixme: Database takes in two variables of numbers of expiration data

    //Maybe be more clear on time requirements

    //Pay page JSX
    return (
        <>  
            <BackButton href={`https://main.d3h3garbunpjkz.amplifyapp.com/#/cart/${username}`} style={{left:'330px'}}></BackButton>
            <h1>Make Payment</h1>
            <fieldset style={{width:'30%', marginLeft:'35%'}}>
                <legend>Form</legend>
                <section style={{display:'flex', flexDirection:'row'}}>
                    <section style={{marginRight:'20%'}}>

                        <input defaultValue={realName} className='textInput' type="text" placeholder={"name"} onChange={handleName}/><br/>
                        <p className="error" hidden={nameErr===''?true:false}>{nameErr}</p>
                        <input defaultValue={address} className='textInput' type="text" placeholder='address' onChange= {e=>setAddress(e.target.value)}/><br/>
                        
                        <input type="radio" id="credit" value='credit' name='payment_type' onClick={handleType}/>
                        <label htmlFor="credit">Credit</label>
                        <input type="radio" id="debit" value='debit' name='payment_type' onClick={handleType}/>
                        <label htmlFor="debit">Debit</label>
                        <br/>
                        <p className="error" hidden={typeErr===''?true:false}>{typeErr}</p>


                        <input defaultValue='' className='textInput' type="password" placeholder='Card Number' onChange={handleCredit}/><br/>
                        <p className="error" hidden={credNumErr===''?true:false}>{credNumErr}</p>

                        <input defaultValue='' className='textInput' type="password" placeholder='securirity code' onChange={handleSSC}/><br/>
                        <p className="error" hidden={codeErr===''?true:false}>{codeErr}</p>

                        
                        <input defaultValue='' className='textInput' style={{width:'74px'}}type="text" placeholder='Card Experation Date' onChange={e=>setExpDate(e.target.value)}/> /    
                        <input defaultValue='' className='textInput' style={{width:'73px'}} type="text" placeholder='Card Experation Date'/><br/>


                        <input defaultValue='' className='textInput' type="text" placeholder='Card Zip Code' onChange={handleZip}/><br/>
                        <p className="error" hidden={zipErr===''?true:false}>{zipErr}</p>


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