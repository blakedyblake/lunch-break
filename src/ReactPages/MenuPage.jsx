import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BackButton from '../components/BackButton'
import MenuItem from '../components/MenuPage/ItemRow'

const MenuPage = ()=>{
    const { username, restaurantId,restaurantName} = useParams()
    const [restaurantData, SetRestaurantData] = useState([]);
    const [menuData, SetMenuData] = useState([])

    console.log(restaurantId)

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
            <div className='left-dark' style={{top:'-30px'}}></div>
            <div className='right-dark' style={{top:'-30px'}}></div>
            <div  style={{
                width:"650px", height:"600px", background:'url('+restaurantData[0].url+')',
                backgroundSize:'cover',
                borderRadius:'30%/10%',
                alignSelf:'center',
                marginTop:'30px',
                
                marginLeft:'29%',
                boxShadow: 'ivory -1px -1px 2px, black 2px 2px 3px'
                
                
                }}/>
            <BackButton href={`http://localhost:3000/#/main/${username}`} style={{top:'40px', left:'290px'}}/>
            <h1>{restaurantName!=='test'?restaurantName: restaurantData[0].name}</h1>
            {menuData.map((e,k)=>{
                return <MenuItem key={k} item_id={e.id} url={e.url} price={e.price} description={e.description} name={e.name}></MenuItem>
            })}

        </>
    ):(
        <div className="loading">loading</div>
    )
}
export default MenuPage