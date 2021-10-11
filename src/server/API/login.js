const config = {
    connectionString:'postgres://phyvslpnwqnnxh:636dcd4fc60c81970030514ddf381fd4f6b70a79d4dfc6021da964d7a1658ce2@ec2-34-199-209-37.compute-1.amazonaws.com:5432/d4uoeopps85ng',
    ssl:{
        rejectUnauthorized:false
    }
}
const {Client} = require('pg')

const loginCP = {
    signIn : (req, res)=>{
        const maxclient = new Client(config);
        maxclient.connect()
        maxclient.query(`SELECT MAX(id) FROM users`)
        .then((maxres)=>{
            let max = maxres.rows[0].max
            console.log(max)
        
        
            const{username, password} = req.body;
            const client = new Client(config)
            client.connect()
            //Database still isn't autoincrementing...
            client.query(`INSERT INTO users VALUES(${max +1},'${username}', '${password}')`)
            .then((response)=>{
                console.log('USERS TABLE')
                res.send(200)
            }).catch((err)=>{
                console.error(err, 'TABLE_ERR')
                res.send(404)
            })
            .finally(()=>{
                client.end()
            })
        }).catch((err)=>{
            console.error(err);
        }).finally(()=>{
            maxclient.end()
        })
    },
    login: (req,res)=>{
        const username = req.params.username;
        const client = new Client(config)
    
        client.connect()
        client.query(`SELECT * FROM users WHERE username='${username}'`)
        .then((response)=>{
            res.send(response.rows)
        }).catch((err)=>{
            console.error(err)
            res.status(404)
        }).finally(()=>{
            client.end()
        })
    
    }
}

module.exports = loginCP;