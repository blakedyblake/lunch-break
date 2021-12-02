import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BackButton from '../components/BackButton'
import MenuItem from '../components/MenuPage/ItemRow'

const MenuPage = ()=>{
    //Neccessary data
    const { username, restaurantId,restaurantName} = useParams()
    const [restaurantData, SetRestaurantData] = useState([]);
    const [menuData, SetMenuData] = useState([])

    console.log(restaurantId)


    //Gets menu data from the restaurant id provided in the window.location.href parameter
    useEffect(()=>{
        //API call for restaurant photo https://lb-server.herokuapp.com/
        axios.get(`https://lb-server.herokuapp.com/menu/restaurant/${restaurantId}`).then(res=>{
            SetRestaurantData(res.data)
            console.log('RD: ',res.data)
        }).catch(err=>{console.error(err)})
        //API call for menue items https://lb-server.herokuapp.com/
        axios.get(`https://lb-server.herokuapp.com/menu/getItems/${restaurantId}`).then(res=>{
            SetMenuData(res.data)
            console.log('MD: ',res.data)
        }).catch(err=>{console.error(err)})
    },[])

    return (restaurantData.length && menuData.length)?(
        <>  
            <h1>Kotae doko EEEEEEEEEEE</h1>
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
            <BackButton href={`https://main.d3h3garbunpjkz.amplifyapp.com/#/main/${username}`} style={{top:'40px', left:'290px'}}/>
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