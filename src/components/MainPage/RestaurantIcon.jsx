import React, {useContext} from 'react';
import { useParams } from 'react-router';
import { GlobalContext } from '../../Context/IdProvider';
import axios from 'axios';


const RestaurantIcon = ({image, title,res_id})=>{
    const {username} = useParams()
    const {setRestId} = useContext(GlobalContext)
    const toRestaurantPage = async()=>{

        setRestId(res_id)
        //https://lb-server.herokuapp.com/
        await axios.put(`https://lb-server.herokuapp.com/restaurant-popularity/${res_id}`).then((res)=>{}).catch((err)=>{
            console.error(err)
        })
        //Client address
        window.location.href = `https://main.d3h3garbunpjkz.amplifyapp.com/#/menu/${username}/${res_id}/${title}/`
    }
    return(
        <section className='restaurant-holder'>

                <div className='restaurantIcon' style={{
                    backgroundImage: 'url('+image+')',
                    borderRadius: '50%',
                    width:'100px',
                    height:'100px'
            
            }} onClick={toRestaurantPage}/>
                <h4>{title}</h4>
     
        </section>

    )
}

export default RestaurantIcon;