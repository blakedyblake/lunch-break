import React from 'react'
import {Route,Switch} from  'react-router-dom'

import MenuPage from './ReactPages/MenuPage'
import LoginPage from './ReactPages/LoginPage'
import MainPage from './ReactPages/MainPage'
import CartPage from './ReactPages/CartPage'
import PayPage from './ReactPages/PayPage'
import SuccessPage from './ReactPages/Success'

export default
    (
        <Switch>
            <Route exact path='/' component={LoginPage}/>
            <Route path='/main/:username' component={MainPage}/>
            <Route path='/menu/:username/:restaurantId/:restaurantName/' component={MenuPage}/>
            <Route path='/cart/:username' component={CartPage}/>
            <Route path='/pay/:username/:total' component={PayPage}/>
            <Route path='/success/:username' component={SuccessPage}/>
        </Switch>
    )


