
const jwt = require('jsonwebtoken');
const Role = require('model/role')
const config = require('config.json');
const fetch = require('node-fetch');


// TODO: get users from DB
const getUsers = () => ([
    {  
        id:"a0ece5db-cd14-4f21-812f-966633e7be86",
        name:"Britney",
        email:"britneyblankenship@quotezart.com",
        role: "admin",
        password: "britney123"
    },
    {  
        id:"e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
        name:"Manning",
        email:"manningblankenship@quotezart.com",
        role: "admin",
        password: "manning123"
    },
    {  
        id:"a3b8d425-2b60-4ad7-becc-bedf2ef860bd",
        name:"Barnett",
        email:"barnettblankenship@quotezart.com",
        role: "user",
        password: "barnett123"
    }
])

const authenticate = async ({email, password}) => {
    const user = getUsers().find(user => user.email === email && user.password == password);
    if (user) {
        const token = jwt.sign({ id: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

const getUserById = async (id) => {
    const user = await fetch('http://www.mocky.io/v2/5808862710000087232b75ac')
    const userData = await user.json();
    const foundUser = userData.clients.find(user => user.id === id)
    
    return foundUser
}

module.exports = {
    authenticate,
    getUserById
};