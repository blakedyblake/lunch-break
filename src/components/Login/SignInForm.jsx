import React, {useState} from 'react'
import axios from 'axios'

const SignIn = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [userErr, setUserErr] = useState('')
    const [passErr, setPassErr]=useState('')
    const [confirmErr, setConfirmErr]= useState('')


    const handleUserName = (e)=>{
        let {value} = e.target;
        setUsername(value);
        (()=>{
            if(value.length >=8) setUserErr('');
            else setUserErr('err')
            
        })()
        
    }
    const handlePassword=(e)=>{
        let {value} = e.target;
        setPassword(value);
        (()=>{
            if(value.length>=8) setPassErr('');
            else setPassErr('Password needs 8 or more characters')

            if(value !== confirmPassword) setConfirmErr('Passwords need to match')
            else setConfirmErr('')
        })()
    }
    const handleConfirm= (e)=>{
        let {value} = e.target;
        setConfirmPassword(value);
  
        (()=>{
            if(value === password) setConfirmErr('');
            else setConfirmErr('Passwords need to match')
        })()
    }
    const newData = ()=>{
        if(userErr===''&&passErr===''&&confirmErr===''){
            axios.post('http://localhost:5000/login/newuser',{
                username, password,
            }).then((res)=>{
                console.log('API success for sign in')
            }).catch((err)=>{
                console.error('MyErr',err)
            })
        }else setConfirmErr('Must be valid')
    }

    return(
        <div className="creditals" id="sign-in">
            <fieldset>
                <legend>Sign-in</legend>
                    <input type="text" placeholder='username'onChange={handleUserName}/><br/>
                    <p className="error">{userErr}</p>
                    <input type="password" placeholder='password' onChange={handlePassword}/><br/>
                    <p className="error">{passErr}</p>
                    <input type="password" placeholder='confirm password' onChange={handleConfirm}/>
                    <p className="error">{confirmErr}</p>

                    <button className='submit-btn' onClick={newData}>Submit</button>
            </fieldset>
            <fieldset>
                <legend>Ex</legend>
                <p>{username}|| {password} || {confirmPassword}</p>
            </fieldset>
        </div>
    )

}

export default SignIn;