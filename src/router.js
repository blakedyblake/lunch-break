import {Route,Switch} from  'react-router-dom'
import MenuPage from './ReactPages/MenuPage'
import LoginPage from './ReactPages/LoginPage'
import MainPage from './ReactPages/MainPage'
import CartPage from './ReactPages/CartPage'
import PayPage from './ReactPages/PayPage'
const router = ()=>{
    return(
        <Switch>
            <Route exact path='/' component={LoginPage}></Route>
            <Route path='/main/:id/:username' component={MainPage}></Route>
            <Route path='/restaurants/:userid/:username/:filter'></Route>
            <Route path='/menu/:userid/:username/:restaurantId/:restaurantName/:url' component={MenuPage}></Route>
            <Route path='/cart/:userid/:username' component={CartPage}></Route>
            <Route path='/pay/:userid/:username/:total' component={PayPage}></Route>
        </Switch>
    )
}

export default router