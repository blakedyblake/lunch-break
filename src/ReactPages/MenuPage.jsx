import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import MenuItem from '../components/MenuPage/ItemRow'

const MenuPage = ()=>{
    const {userid, username, restaurantId,restaurantName,url} = useParams()
    const [restaurantData, SetRestaurantData] = useState([]);
    const [menuData, SetMenuData] = useState([])

    useEffect(()=>{
        //API call for restaurant photo
        axios.get(`http://localhost:5000/menu/restaurant/${restaurantId}`).then(res=>{
            SetRestaurantData(res.data)
        }).catch(err=>{console.error(err)})
        //API call for menue items
        axios.get(`http://localhost:5000/menu/getItems/${restaurantId}`).then(res=>{
            SetMenuData(res.data)
        }).catch(err=>{console.error(err)})
    },[])
    return (restaurantData.length && menuData.length)?(
        <>
            <div  style={{width:"300px", height:"500px", background:'url('+restaurantData[0].url+')'}}/>
            <h1>{username}'s Cart:</h1>
            <h1>{restaurantName}</h1>
            {menuData.map((e,k)=>{
                return <MenuItem key={k} item_id={e.id} url={e.url} price={e.price} description={'Lorem Ispum'} name={e.name}></MenuItem>
            })}

        </>
    ):(
        <div className="loading">loading</div>
    )
}
export default MenuPage