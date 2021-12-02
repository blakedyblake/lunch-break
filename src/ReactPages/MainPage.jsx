import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../Context/IdProvider";
import TemplateSelector from "../components/MainPage/TemplateSelector";
import Filters from "../components/MainPage/Filters";

const MainPage = ()=>{
    //Neccessary hook data
    const {username} = useParams()
    const [type, setType] = useState('None')
    const [arr1, setArr1]= useState([])
    const [arrGP, setArrGP]= useState([])
    const [altTitle, setAltTitle] = useState('')

    const context = useContext(GlobalContext)
    console.log(context.user_id)

    if(context.user_id===0) window.location.href = 'http://localhost:3000/'

    //There are two different lists of restaurants from the API calls
    //Universal and filtered, both are sorted by popularity
    useEffect(()=>{
        console.log('trigger:', type);
        //https://lb-server.herokuapp.com/
        axios.get('https://lb-server.herokuapp.com/restaurants/global').then((res)=>{
            setArrGP(res.data)
        })
        if(type==='None') return
        //https://lb-server.herokuapp.com/
        axios.get(`https://lb-server.herokuapp.com/restaurant-type/${type}`).then(res=>{
            console.log(res.data)    
            setArr1(res.data)

            setAltTitle(`${type} Restaurants on Lunch Break`)
        }).catch(err=>console.error(err))
    },[type])


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
                <Filters fn={setType}/>
                <div className="clickThrough Two"></div>
                <TemplateSelector arr={arr1} type={altTitle}></TemplateSelector>

                <div className="whiteBox"style={{width:'880px', 
                height:'200px', borderRadius:'20%', backgroundColor:'white',
                position:'absolute', top:'1850px', left:'300px'}}></div>



            </div>
        </>
    )
}

export default MainPage;