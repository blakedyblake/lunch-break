const config = {
    connectionString:'postgres://phyvslpnwqnnxh:636dcd4fc60c81970030514ddf381fd4f6b70a79d4dfc6021da964d7a1658ce2@ec2-34-199-209-37.compute-1.amazonaws.com:5432/d4uoeopps85ng',
    ssl:{
        rejectUnauthorized:false
    }
}
const {Client} = require('pg')

const cartCP = {
    getCart: (req,res)=>{
        const {userId} = req.params;
        const client = new Client(config)
        client.connect()
        const query =`SELECT c.order_id as "id", c.quantity as "quantity", r.name as "restaurant", m.name as "name", m.url as "url", m.price as "price" FROM current_orders c INNER JOIN menu_items m ON m.id=c.item_id INNER JOIN restaurants r ON r.id=c.restaurant_id WHERE user_id=${userId}`
        console.log(query)
        client.query(query)
        .then((response)=>{
            console.log(response.rows)
            res.send(response.rows)
        }).catch(err=>{console.error(err)})
        .finally(()=>client.end())
    },
    deleteFromCart: (req,res)=>{
        const {id} = req.params;
        const client = new Client(config)
        client.connect()
        const query = `DELETE FROM current_orders WHERE order_id=${+id}`
        client.query(query).then(response=>{
            res.status(200)
        }).catch(err=>console.error(err)).finally(()=>client.end())
    }
}

module.exports = cartCP