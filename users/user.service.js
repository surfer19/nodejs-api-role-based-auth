
const jwt = require('jsonwebtoken');
const config = require('config.json');
const fetch = require('node-fetch');

// TODO: get users from DB
const getUsersFromDb = () => ([
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
    const user = getUsersFromDb().find(user => user.email === email && user.password == password);
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
    const allUsers = await getUsers();
    const foundUser = allUsers.find(user => user.id === id);
    
    return foundUser;
}

const getUsers = async (name) => {
    const allUsers = await fetch('http://www.mocky.io/v2/5808862710000087232b75ac');
    const userData = await allUsers.json();
    if (name) {
        return userData.clients.find(user => user.name === name);
    }
    // return all users
    return userData.clients;
}

const getUserPolicies = async (id) => {        
    const allPolicies = await fetch('http://www.mocky.io/v2/580891a4100000e8242b75c5');
    const policieData = await allPolicies.json();
    
    return policieData.policies.filter(policie => policie.clientId === id);
}

module.exports = {
    authenticate,
    getUserById,
    getUsers,
    getUserPolicies
};