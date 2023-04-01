let users = []

const mkUser = (userName, ipaddr) => {
    users.push({
        userName,
        uuid: crypto.randomUUID(),
        ipaddr
    })
}

const register = (app) => {

    app.get('/api/users', (req, res) => {

        res.send(JSON.stringify(users.map(user => {
            return {
                userName: user.userName,
                uuid: user.uuid
            }
        })));

    });

    app.post('/api/users',(req,res)=>{

        console.log(req);
        console.log(req.body);
        var data = req.body;
        mkUser(data.userName, req.clientIp)
        
        res.send(JSON.stringify({userName: users[users.length-1].userName,
            uuid: users[users.length-1].uuid}));

    });


}

module.exports = {
    register
}