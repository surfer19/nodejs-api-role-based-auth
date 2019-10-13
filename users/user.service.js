
const jwt = require('jsonwebtoken');
const config = require('config.json');
const fetch = require('node-fetch');
const UserModel = require('models/user')

const authenticate = async ({email, password}) => {
    const user = (await getUsers()).find(user => user.email === email && user.password == password);    
    if (user) {        
        const token = jwt.sign({ id: user._id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

const getUserById = async (id) => {
    const allUsers = await getUsers();
    const foundUser = allUsers.find(user => user._id === id);
    
    return foundUser;
}

const getUsers = async (name) => {    
    const users = await UserModel.find()
    
    if (name) {
        return users.find(user => user.name === name);
    }
    // return all users
    return users;
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