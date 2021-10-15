const config = {
    connectionString:'postgres://phyvslpnwqnnxh:636dcd4fc60c81970030514ddf381fd4f6b70a79d4dfc6021da964d7a1658ce2@ec2-34-199-209-37.compute-1.amazonaws.com:5432/d4uoeopps85ng',
    ssl:{
        rejectUnauthorized:false
    }
}
const {Client} = require('pg')

const mainCP = {
    getRestaurants: (req,res)=>{
        let client = new Client(config);
        client.connect();
        client.query('SELECT * FROM restaurants')
        .then((response)=>{
            res.status(200).send(response.rows)
        }).catch((err)=>{
            console.error(err)
        }).finally(()=>{
            client.end()
        })
    },
    getRestaurantsGlobal: (req,res)=>{
        let client = new Client(config);
        client.connect();
        client.query('SELECT * FROM restaurants ORDER BY global_popularity DESC')
        .then((response)=>{
            res.status(200).send(response.rows)
        }).catch((err)=>{
            console.error(err)
        }).finally(()=>{
            client.end()
        })
    },

    updateRestaurantPopularity:(req,res)=>{
        const {rest_id} = req.params
        console.log(rest_id)
        let getClient = new Client(config)
        getClient.connect()
        const getQuery = `SELECT global_popularity FROM restaurants WHERE id=${+rest_id}`;
        getClient.query(getQuery).then(response=>{
            const {global_popularity} = response.rows[0]
            console.log(global_popularity)




            const updateClient = new Client(config)
            updateClient.connect()
            const updateQuery = `UPDATE restaurants SET global_popularity = ${global_popularity+1} WHERE id=${rest_id}`
            updateClient.query(updateQuery).then((response2)=>{
                console.log('Update Successful')
            }).catch((err)=>console.error(err)).finally(()=>updateClient.end())
        }).catch(err=>console.error(err)).finally(()=>getClient.end())
        res.status(200).send("global_popularity+1")
    }
}

module.exports = mainCP;