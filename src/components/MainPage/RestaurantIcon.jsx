import React from 'react';
import { useParams } from 'react-router';
const RestaurantIcon = ({image, title,res_id})=>{
    const {id, username} = useParams()
    const toRestaurantPage = ()=>{
        console.log(title)
        window.location.href = `http://localhost:3000/menu/${id}/${username}/${res_id}/${title}/${image}`
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