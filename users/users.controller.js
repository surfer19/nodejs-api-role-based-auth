const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize')

/**  ROUTES - /users
 *   
 *   /                   - Returns all users (use query param ?name to filter by name)
 *   /:userId            - Returns user by user ID
 *   /:userId/policies   - Returns user policies by user ID
 *   /authenticate       - Returns user with JWT token
 * 
 **/

// Authenticate user
router.post('/authenticate', async (req, res, next) => {
    try {
        const user = await userService.authenticate(req.body);
        user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' });
    }
    catch (err) {
        next(err);
    }
})

// Get users
router.get('/', authorize(), async (req, res, next) => {
    try {
        const users = await userService.getUsers(req.query.name);
        users ? res.json(users) : res.status(404).json({ message: `User with name ${req.query.name} not found` });
    }
    catch (err) {
        next(err);
    }
})


// Get user by ID
router.get('/:userId', authorize(), async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.userId);
        user ? res.json(user) : res.status(404).json({ message: `User with id ${req.params.userId} not found` });
    }
    catch (err) {
        next(err);
    }
})

// Get user policies by user ID
router.get('/:userId/policies', authorize("admin"), async (req, res, next) => {
    try {
        const user = await userService.getUserPolicies(req.params.userId);
        user ? res.json(user) : res.status(404).json({ message: `User with id ${req.params.userId} not found` });
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;