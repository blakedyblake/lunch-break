import axios from 'axios';
import React, {useContext, useState} from 'react'
import {GlobalContext} from '../../Context/IdProvider';


const LogIn = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [logError, setLogError] = useState('');

    //const {user_id,setUser}  = useContext(GlobalContext)
    const context = useContext(GlobalContext)
    //console.log(GlobalContext)


    const handleUserName = (e)=>{
        setUsername(e.target.value);
    }
    
    const handleSubmit = ()=>{
        console.log(context, 'Context before axios')
        axios.post(`http://localhost:5000/login/${username}`,{password}).then(  (res)=>{
        
            let _200 = (res.status===200)
            
            setLogError(_200? 'Success':'Wrong username/password');
            context.setUserId(res.data.id? res.data.id: null)//FIXME: This doesn't permanently change the state
            if(_200) window.location.href = window.location.href +`main/${username}`

    }).catch((err)=>{
        console.error('Whaa',err)

        setLogError('Wrong username/password')
    } )
    console.log(context, 'Context after axios')
    
    }
    return(
        <div className="creditals" id='login'>
            <fieldset>
                <legend>Login</legend>

                    <input type="text" placeholder='username'onChange={handleUserName}/><br/>

                    <input type="password" placeholder='password' onChange={e=>setPassword(e.target.value)}/>
                    <p className="error">{logError}</p>
                    <button className='submit-btn' onClick={handleSubmit}>Submit</button>


            </fieldset>
        </div>
    )

}

export default LogIn;