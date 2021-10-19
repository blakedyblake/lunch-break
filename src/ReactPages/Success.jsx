import React from "react";
import { useParams } from "react-router";
import BackButton from "../components/BackButton";
const SuccessPage = ()=>{
    const {username} = useParams()
    return(
        <>  
            <BackButton href={`http://localhost:3000/#/cart/${username}`} style={{left:'430px', top:'80px'}}></BackButton>
            <fieldset id='success-box'style={{width:'300px', position:'absolute',top:'100px', left:'600px'}}>
                <h1>Payment Successful!</h1>

            </fieldset>
        </>
    )
}

export default SuccessPage