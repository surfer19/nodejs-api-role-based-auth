const express = require('express');
const router = express.Router();
const authorize = require('_helpers/authorize')
const policyService = require('./policy.service')

/**  ROUTES
 *
 *   /:policieId/users
 *
 **/

router.get('/:policieId/users', authorize("admin"), async (req, res, next) => {
    try {
        const user = await policyService.getUserByPolicyId(req.params.policieId);
        user ? res.json(user) : res.status(404).json({ message: `User with policy id ${req.params.policieId} not found` });
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;