import axios from 'axios';
import React, {useContext, useState} from 'react'
import { ConfigContext } from '../../App';


const LogIn = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [logError, setLogError] = useState('');

    const context = useContext(ConfigContext)

    const handleUserName = (e)=>{
        setUsername(e.target.value);
        

    }
    const handleSubmit = async()=>{

        axios.get(`http://localhost:5000/login/${username}`).then(res=>{
            console.log(res.data)
            const dataPassword = res.data[0].password;
            if(!dataPassword) setLogError('That username is not found. Sign in')
            else if(password !== dataPassword) setLogError('Wrong username/password')
            else{
                //Take us to it
                setLogError('Success!')
                context.userId = 
                window.location.href = window.location.href +`main/${res.data[0].id}/${username}`
                
            }
        }).catch(()=>{
            console.error('What be goin on?')
            setLogError('Wrong username/password')
        } )
            
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