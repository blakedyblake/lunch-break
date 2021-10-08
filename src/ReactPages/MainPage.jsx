import React from "react";
import { useParams } from "react-router";
const MainPage = ()=>{
    const {id, username} = useParams()
    return(
        <>
            <img src="https://3.bp.blogspot.com/-pBXTC4k15Dw/T9pJiR9ux2I/AAAAAAAAApw/F2o1FFEjoOA/s1600/recipe,Gourmet-Chicken.png" alt="Main" />
            <h2>Welcome, {username}!</h2>
            
        </>
    )
}

export default MainPage;