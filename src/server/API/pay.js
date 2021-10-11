const config = {
    connectionString:'postgres://phyvslpnwqnnxh:636dcd4fc60c81970030514ddf381fd4f6b70a79d4dfc6021da964d7a1658ce2@ec2-34-199-209-37.compute-1.amazonaws.com:5432/d4uoeopps85ng',
    ssl:{
        rejectUnauthorized:false
    }
}
const {Client} = require('pg')

const payCP = {
    pay: (req, res)=>{
        const {
            total,
            userid,
            realName,
            address,
            payType,
            cardNumber,
            SSC, 
            zipCode,
            expDate,
            deliveryDate,
            cartArr
        } = req.body;

        const maxclient = new Client(config);
        maxclient.connect()
        const query1 = `SELECT MAX(id) FROM carts`;
        maxclient.query(query1).then(response1=>{
            let max =response1.rows[0].max;

            const client2 = new Client(config);
            client2.connect()
            const query2 = `INSERT INTO carts VALUES(${+max+1},${+userid})`
            console.log(query2)
            client2.query(query2).then(()=>{
                
                
            }).catch(err=>console.error(err)).finally(()=>{client2.end()})

            const maxclient1 = new Client(config);
            maxclient1.connect()
            const query3 = `SELECT MAX(id) FROM pay_info`;
            maxclient1.query(query3).then((response2)=>{
                let max2 = response2.rows[0].max
                console.log(max2)
                const client4 = new Client(config)
                client4.connect()
                const query4 = `insert into pay_info values(${+max2 +1}, ${+max+1},
                    ${cardNumber},${SSC}, ${zipCode}, 
                    '${address}', '${deliveryDate}', 
                    '${expDate}','${realName}', ${total},'${payType}')`
                console.log(query4)
                client4.query(query4).then(()=>{}).catch(err=>{console.error(err)}).finally(()=>client4.end())
                
                const maxclient3 = new Client(config)
                maxclient3.connect()
                const query5 = `SELECT MAX(id) FROM confirmed_carts`
                maxclient3.query(query5).then((response3)=>{
                    let max3 = +response2.rows[0].max
                    let add = 1
                    for(let index of cartArr){
                        const {quantity,restaurant, name} = index
                        const client7 = new Client(config)
                        client7.connect()
                        const query7 = `INSERT INTO confirmed_carts VALUES(${+max3 +add},${+max2 +1},${quantity}, 
                            '${restaurant}','${name}')`
                            console.log(query7)
                        client7.query(query7).then(()=>{
                            
                        }).catch(err=>console.error(err)).finally(()=>client7.end())
                        add++
                    }
                }).catch(err=>console.error(err)).finally(()=>maxclient3.end())

            }).catch((err)=>console.error(err)).finally(()=>maxclient1.end())

            //
            const deleteClient = new Client(config)
            deleteClient.connect()
            const deleteQuery = `DELETE FROM current_orders WHERE user_id=${userid}`
            deleteClient.query(deleteQuery)
            .then(()=>{}).catch((err)=>{console.error(err)}).finally(()=>deleteClient.end())
        }).catch(err=>console.error(err)).finally(()=>{maxclient.end()})

    }

    
}

module.exports = payCP