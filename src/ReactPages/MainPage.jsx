import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../Context/IdProvider";
import TemplateSelector from "../components/MainPage/TemplateSelector";

const MainPage = ()=>{
    const {username} = useParams()
    const [arr1, setArr1]= useState([])
    const [arrGP, setArrGP]= useState([])
    
    const context = useContext(GlobalContext)
    console.log(context.user_id)
    if(context.user_id===0) window.location.href = 'http://localhost:3000/'

    useEffect(()=>{
        axios.get('http://localhost:5000/restaurants/no-order').then(res=>{
            console.log(res.data)    
            setArr1(res.data)
        })
        axios.get('http://localhost:5000/restaurants/global').then((res)=>{
            setArrGP(res.data)
        })
    },[])
    return(
        <>
            <div className='left-dark'></div>
            <div className='right-dark'></div>
            <div className='main-stability'>
                <img src="https://3.bp.blogspot.com/-pBXTC4k15Dw/T9pJiR9ux2I/AAAAAAAAApw/F2o1FFEjoOA/s1600/recipe,Gourmet-Chicken.png" alt="Main" />
                <h1 className="main title">Lunch Break</h1>
                <h2>Welcome, {username}!</h2>
                <TemplateSelector arr={arrGP} type='Popular Restaurants on Lunch Break'></TemplateSelector>
                <div className="clickThrough 1"></div>
                <TemplateSelector arr={arr1} type='Popular on Lunch Break'></TemplateSelector>
                <div className="clickThrough Two"></div>
                <TemplateSelector arr={arr1} type='Popular on Lunch Break'></TemplateSelector>

                

            </div>
        </>
    )
}

export default MainPage;