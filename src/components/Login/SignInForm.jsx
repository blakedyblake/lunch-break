import React, {useState} from 'react'
import axios from 'axios'

const SignIn = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [userErr, setUserErr] = useState('')
    const [passErr, setPassErr]=useState('')
    const [confirmErr, setConfirmErr]= useState('')

    const [axiosErr, setAxiosErr] = useState("");

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
        if(username===''){
            setUserErr('Cannot be blank')
            return
        }
        if(userErr===''&&passErr===''&&confirmErr===''){
            axios.post('http://localhost:5000/login/newuser',{
                username, password,
            }).then((res)=>{
                setAxiosErr('Success! Now log in using your creditials')
                setUsername('')
                setPassword('')
                setConfirmPassword('')
                
                let arr = document.getElementsByTagName('input')
                for(let i of arr){
                    console.log(i)
                    i.value=''
                }
            }).catch((err)=>{
                setUsername('')
                let input = document.getElementById('sign-in-username')
                input.value = ''
                setAxiosErr('Already a person with that username')
                console.error('MyErr',err)
            })
        }else setConfirmErr('Must be valid')
    }

    return(
        <div className="creditals" id="sign-in">
            <fieldset>
                <legend>Sign-in</legend>
                    <input id='sign-in-username' type="text" placeholder='username'onChange={handleUserName}/><br/>
                    <p className="error">{userErr}</p>
                    <input type="password" placeholder='password' onChange={handlePassword}/><br/>
                    <p className="error">{passErr}</p>
                    <input type="password" placeholder='confirm password' onChange={handleConfirm}/>
                    <p className="error">{confirmErr}</p>

                    <button className='submit-btn' onClick={newData}>Submit</button>
            </fieldset>
            <fieldset>
                <legend>Validation</legend>
                <p className='error'>{axiosErr}</p>
            </fieldset>
        </div>
    )

}

export default SignIn;