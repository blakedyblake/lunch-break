import axios from 'axios';
import React, {useState} from 'react'
import { useParams } from 'react-router';
import { useContext } from 'react';
import { GlobalContext } from '../../Context/IdProvider';

const MenuItem = ({key, url, name,description, price,item_id})=>{
    const [quantity, setQuantity] = useState(0);
    const { restaurantId, username} = useParams();
    const {user_id} = useContext(GlobalContext);
    console.log(user_id)
    if(user_id===0) window.location.href = 'https://main.d3h3garbunpjkz.amplifyapp.com/#/'

    const addToCart = ()=>{
        if(quantity<1){
            alert('Quantity must be at least one to add')
            return
        }
        const obj = {
            restaurant_id:+restaurantId, user_id, item_id:+item_id, quantity
        }
        console.log(obj)
        //https://lb-server.herokuapp.com/
        axios.post('https://lb-server.herokuapp.com/menu/addToCart',obj).then((res)=>{
            let inputs = document.getElementsByTagName('input')
            for(let input of inputs){
                input.value = ''
            }

            
        }).catch(err=>console.error(err))

        //Food Popularity
        //https://lb-server.herokuapp.com/
        axios.put(`https://lb-server.herokuapp.com/menu-item-popularity/${item_id}`).then(()=>{

        }).catch(err=>console.error(err))
        
        alert(`Added ${quantity} ${name}s to cart`)
        
    }
    const GoToCart = ()=>{
        window.location.href = `https://main.d3h3garbunpjkz.amplifyapp.com/#/cart/${username}`
    }
    return(
        <section className='menuItem' id ={key} style={{display:'flex', flexDirection:'row', marginBottom:'20px', alignItems:'center',
            marginLeft:'16%',width:'65%',borderBottomStyle:'dashed', borderBottomWidth:'2px', 
            borderBottomColor:'#c4c4c4', paddingBottom:'30px', paddingTop:'10px'
            
        }}>
            <div className="circle" style={{background: 'url('+url+')', borderRadius: '50%',
                    width:'200px',
                    height:'200px'}}/>
            <section style={{display:'flex', flexDirection:'column', flexGrow:2}}>
                <h2>{name}</h2>
                <p style={{width:'300px', alignSelf:'center'}}>{description}</p>
                <h2>{price}</h2>
            </section>
            <input style={{marginRight:'20px'}}
                className='quantityInputs'type="number" min={0} max={100}placeholder='Number?' onChange={e=>setQuantity(+e.target.value)}/>
            <section style={{display:'flex', flexDirection:'column'}}>
                <button style={{backgroundColor:'transparent', borderColor:'transparent', color:'#CDE77F', fontSize:'50px',cursor:'pointer'}} onClick={addToCart}>+</button>
                <button className='cart-btn' onClick={GoToCart} style={{ width:'60px',
                    height: '30px',fontFamily:'Cookie', fontSize:'16px',
                    borderRadius: '40%', backgroundColor:'#CDE77F',
                    textShadow: '6px 6px 10px #004000',cursor:'pointer'
                }}>To Cart</button>
            </section>
        </section>
    )
}

export default MenuItem;