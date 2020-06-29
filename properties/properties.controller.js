const express = require('express');
const router = express.Router();
// const authorize = require('_helpers/authorize')
const propertyService = require('./properties.service')

/**  ROUTES
 *   /
 *   /sync
 * 
 **/

router.get('/sync', async (req, res, next) => {
    try {
		const properties = await propertyService.syncData();
		properties ? res.json(properties) : res.status(400).json({ message: `Something went wrong with Relocista API!` });
		
    }
    catch (err) {
        next(err);
    }
})

router.get('/', async (req, res, next) => {
    try {
		const startDate = req.query.startDate;
		const endDate = req.query.endDate;
		const city = req.query.city;
		const properties = await propertyService.getProperties(startDate, endDate, city)
		res.json(properties)
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;