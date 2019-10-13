const userService = require('../users/user.service');
const fetch = require('node-fetch');

const getUserByPolicyId = async (policieId) => {
    const policy = await getPolicyById(policieId);
    const userId = policy.clientId;
    
    return await userService.getUserById(userId);
}

const getPolicies = async () => {
    const allPolicies = await fetch('http://www.mocky.io/v2/580891a4100000e8242b75c5');
    const policieData = await allPolicies.json();

    return policieData.policies;
}

const getPolicyById = async (policieId) => {
    const allPolicies = await getPolicies();

    return allPolicies.find(policy => policy.id === policieId);
}

module.exports = {
    getUserByPolicyId
}