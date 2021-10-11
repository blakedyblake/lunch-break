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
    }
}

module.exports = mainCP;