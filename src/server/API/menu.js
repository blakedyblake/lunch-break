const config = {
    connectionString:'postgres://phyvslpnwqnnxh:636dcd4fc60c81970030514ddf381fd4f6b70a79d4dfc6021da964d7a1658ce2@ec2-34-199-209-37.compute-1.amazonaws.com:5432/d4uoeopps85ng',
    ssl:{
        rejectUnauthorized:false
    }
}
const { use } = require('bcrypt/promises');
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
        const {restaurant_id, user_id, item_id, quantity} = req.body;
        console.log(user_id===9)
        const isAlreadyAddedClient = new Client(config)
        isAlreadyAddedClient.connect()
        isAlreadyAddedClient.query(`SELECT * FROM current_orders WHERE item_id=${item_id} and user_id=${user_id}`)
        .then((alreadyResponse)=>{
            console.log(alreadyResponse.rows)
            if(alreadyResponse.rows.length === 0){
                maxClient.connect()
                maxClient.query('SELECT MAX(order_id) FROM current_orders')
                .then((response)=>{
                    const client = new Client(config)
                    client.connect()
                    console.log(typeof user_id)
                    const newQuery = `INSERT INTO current_orders VALUES(${+response.rows[0].max +1}, ${+restaurant_id},
                        ${+user_id},${+item_id}, ${+quantity})`;
                        console.log(newQuery)
                    client.query(newQuery).then((resp)=>{
                            res.send(200)
                        }).catch(err=>console.error(err)).finally(()=>{
                            client.end()
                        })
                }).catch((err)=>console.error(err)).finally(()=>{
                    maxClient.end()
                })
            } else{

                const updateOrdersClient = new Client(config)
                updateOrdersClient.connect()
                updateOrdersClient.query(`UPDATE current_orders SET quantity=${alreadyResponse.rows[0].quantity + quantity} WHERE item_id=${item_id} and user_id=${user_id}`)
                .then(()=>{}).catch(err=>console.error(err)).finally(()=>updateOrdersClient.end())
            }
        }).catch(err=>console.error(err)).finally(()=>isAlreadyAddedClient.end())
        const maxClient = new Client(config);
        

    }

    
}

module.exports = menuCP;