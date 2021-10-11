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
app.get('/login/:username', loginCP.login);

app.get('/restaurants/no-order',mainCP.getRestaurants);

app.get('/menu/restaurant/:restaurantId',menuCP.getRestaurantById)
app.get('/menu/getItems/:restaurantId', menuCP.getMenuById)
app.post('/menu/addToCart/',menuCP.addToCart)

app.get('/cart/getCart/:userId', cartCP.getCart)
app.delete('/cart/:id', cartCP.deleteFromCart)

app.post('/pay', payCP.pay)


const port = 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});