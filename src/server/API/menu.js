const config = {
    connectionString:'postgres://phyvslpnwqnnxh:636dcd4fc60c81970030514ddf381fd4f6b70a79d4dfc6021da964d7a1658ce2@ec2-34-199-209-37.compute-1.amazonaws.com:5432/d4uoeopps85ng',
    ssl:{
        rejectUnauthorized:false
    }
}
const {Client} = require('pg')

const menuCP = {
    getRestaurantById: (req,res)=>{
        const {restaurantId} = req.params;
        const client = new Client(config)
        client.connect()
        client.query(`SELECT * FROM restaurants WHERE id=${restaurantId}`)
        .then(response=>{
            res.status(200).send(response.rows)
        }).catch((err)=>{
            console.error(err)
        }).finally(()=>{
            client.end()
        })
    },
    getMenuById: (req,res)=>{
        const {restaurantId} = req.params;
        const client = new Client(config)
        client.connect()
        client.query(`SELECT * FROM menu_items WHERE restaurant_id=${restaurantId}`)
        .then(response=>{
            res.status(200).send(response.rows)
        }).catch((err)=>{
            console.error(err)
        }).finally(()=>{
            client.end()
        })
    },
    addToCart: (req,res)=>{
        console.log(req.body)
        const {restaurant_id, userId, item_id, quantity}= req.body;
        const maxClient = new Client(config);
        maxClient.connect()
        maxClient.query('SELECT MAX(order_id) FROM current_orders')
        .then((response)=>{
            const client = new Client(config)
            client.connect()
            const newQuery = `INSERT INTO current_orders VALUES(${+response.rows[0].max +1}, ${+restaurant_id},
                ${+userId},${+item_id}, ${+quantity})`;
                console.log(newQuery)
            client.query(newQuery).then((resp)=>{
                    res.send(200)
                }).catch(err=>console.error(err)).finally(()=>{
                    client.end()
                })
        }).catch((err)=>console.error(err)).finally(()=>{
            maxClient.end()
        })
    }

    
}

module.exports = menuCP;