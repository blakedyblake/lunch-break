import {Route,Switch} from  'react-router-dom'
import LoginPage from './ReactPages/LoginPage'
import MainPage from './ReactPages/MainPage'
const router = ()=>{
    return(
        <Switch>
            <Route exact path='/' component={LoginPage}></Route>
            <Route path='/main/:id/:username' component={MainPage}></Route>
        </Switch>
    )
}

export default router