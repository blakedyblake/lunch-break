import axios from "axios";
import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import TemplateSelector from "../components/MainPage/TemplateSelector";
const MainPage = ()=>{
    const {id, username} = useParams();
    const [arr1, setArr1]= useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/restaurants/no-order').then(res=>{
            console.log(res.data)    
            setArr1(res.data)
        })
    },[])
    return(
        <div className='main-stability'>
            <img src="https://3.bp.blogspot.com/-pBXTC4k15Dw/T9pJiR9ux2I/AAAAAAAAApw/F2o1FFEjoOA/s1600/recipe,Gourmet-Chicken.png" alt="Main" />
            <h1 className="main title">Lunch Break</h1>
            <h2>Welcome, {username}!</h2>
            <TemplateSelector arr={arr1} type='Popular on Lunch Break'></TemplateSelector>
            <TemplateSelector arr={arr1} type='Popular on Lunch Break'></TemplateSelector>
            <TemplateSelector arr={arr1} type='Popular on Lunch Break'></TemplateSelector>

            

        </div>
    )
}

export default MainPage;