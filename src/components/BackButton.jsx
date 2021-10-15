import React from "react";

const BackButton = ({style, href})=>{
    const GoBack = ()=>{
        window.location.href = href
    }
    return(
        <button className='back-btn' style={style}onClick={GoBack}>Back</button>
    )
}
export default BackButton;