const express = require("express");
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())


const loginCP = require('./API/login')
const mainCP = require('./API/mainPage')
const menuCP = require('./API/menu')
const cartCP = require('./API/cart')
const payCP = require('./API/pay')

app.post('/login/newuser', loginCP.signIn);
app.post('/login/:username', loginCP.login);

app.get('/restaurants/no-order',mainCP.getRestaurants);
app.get('/restaurants/global',mainCP.getRestaurantsGlobal);
app.put('/restaurant-popularity/:rest_id',mainCP.updateRestaurantPopularity)
app.get('/restaurant-type/:type', mainCP.getRestaurantsByType)

app.get('/menu/restaurant/:restaurantId',menuCP.getRestaurantById)
app.get('/menu/getItems/:restaurantId', menuCP.getMenuById)
app.post('/menu/addToCart/',menuCP.addToCart)
app.put('/menu-item-popularity/:itemId', menuCP.increasePopularity)

app.get('/cart/getCart/:userId', cartCP.getCart)
app.delete('/cart/:id', cartCP.deleteFromCart)
app.put('/cart/:order_id/:new_quantity', cartCP.updateQuantity)

app.post('/pay', payCP.pay)//payCP.pay


const port = 5000;
app.listen(process.env.PORT||port, function() {
  console.log("Listening on " + port);
});