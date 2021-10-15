import React, {useContext} from 'react';
import { useParams } from 'react-router';
import { GlobalContext } from '../../Context/IdProvider';
import axios from 'axios';


const RestaurantIcon = ({image, title,res_id})=>{
    const {username} = useParams()
    const {setRestId} = useContext(GlobalContext)
    const toRestaurantPage = async()=>{

        setRestId(res_id)
        
        await axios.put(`http://localhost:5000/restaurant-popularity/${res_id}`).then((res)=>{}).catch((err)=>{
            console.error(err)
        })
        window.location.href = `http://localhost:3000/#/menu/${username}/${res_id}/${title}/`
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