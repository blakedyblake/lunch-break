const config = {
    connectionString:'postgres://phyvslpnwqnnxh:636dcd4fc60c81970030514ddf381fd4f6b70a79d4dfc6021da964d7a1658ce2@ec2-34-199-209-37.compute-1.amazonaws.com:5432/d4uoeopps85ng',
    ssl:{
        rejectUnauthorized:false
    }
}
const {Client} = require('pg')
const bcrypt = require('bcrypt')
const HashKey = 10;

const loginCP = {
    signIn : (req, res)=>{
        const maxclient = new Client(config);
        maxclient.connect()
        maxclient.query(`SELECT MAX(id) FROM users`)
        .then( async(maxres)=>{
            let max = maxres.rows[0].max
            console.log(max)
        
        
            const{username, password} = await req.body;
            const salt = await bcrypt.genSalt(HashKey);
            const hashPass = await bcrypt.hash(password, salt)
            console.log('HashPass:', hashPass)


            const client = new Client(config)
            client.connect()
            //Database still isn't autoincrementing...
            client.query(`INSERT INTO users VALUES(${max +1},'${username}', '${hashPass}')`)
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
        const {password} = req.body
        const client = new Client(config)
    
        client.connect()
        client.query(`SELECT * FROM users WHERE username='${username}'`)
        .then(async(response)=>{
            if(response.rows){
                const {hashpass,id} = response.rows[0]
                const isMatching = await bcrypt.compare(password, hashpass)
                console.log(isMatching)

                if(isMatching) res.status(200).send(response.rows[0])
                else res.status(401).send()
            }else res.status(422).send()
            
        }).catch((err)=>{
            console.error(err)
            res.status(404)
        }).finally(()=>{
            client.end()
        })
    
    }
}

module.exports = loginCP;