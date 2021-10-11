import axios from 'axios';
import React, {useState} from 'react'
import { useParams } from 'react-router';

const MenuItem = ({key, url, name,description, price,item_id})=>{
    const [quantity, setQuantity] = useState(0);
    const {userid, restaurantId, username} = useParams();
    
    const addToCart = ()=>{
        const obj = {
            restaurant_id:+restaurantId, userId:+userid, item_id:+item_id, quantity
        }
        console.log(obj)
        axios.post('http://localhost:5000/menu/addToCart',obj).then((res)=>{
            //Nothing to put here
            console.log('test')
        }).catch(err=>console.error(err))

        
    }
    const GoToCart = ()=>{
        window.location.href = `http://localhost:3000/cart/${userid}/${username}`
    }
    return(
        <section className='menuItem' id ={key} style={{display:'flex', flexDirection:'row', width:'100%', marginBottom:'20px', alignItems:'center',}}>
            <div className="circle" style={{background: 'url('+url+')', borderRadius: '50%',
                    width:'200px',
                    height:'200px'}}/>
            <section style={{display:'flex', flexDirection:'column', flexGrow:2}}>
                <h2>{name}</h2>
                <p>{description}</p>
                <h2>{price}</h2>
            </section>
            <section style={{display:'flex', flexDirection:'column'}}>
                <button onClick={addToCart}>Add to Cart</button>
                <button onClick={GoToCart}>See Cart</button>
                <input type="number" min={0} max={100}placeholder='Quantity' onChange={e=>setQuantity(+e.target.value)}/>
            </section>
        </section>
    )
}

export default MenuItem;