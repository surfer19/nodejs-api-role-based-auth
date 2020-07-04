const fetch = require('node-fetch');
const PropertyModel = require('models/property');

const syncData = async () => {
	return fetch('https://api.apify.com/v2/datasets?token=Wwzi7SxDdoF5wbv8wnh7Lwbui')
		.then(async datasetsJSON => {
			const datasets = await datasetsJSON.json();
			return await datasets.data.items[0].id;
		})
		.then(datasetId => fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=Wwzi7SxDdoF5wbv8wnh7Lwbui&fields=createdAt,modifiedAt,gpsCoord,data`))
		// Load the response as json
		.then(async propertyList => {
			return await propertyList.json()
		})
}

const getProperties = async(startDate, endDate, city) => {
	return await PropertyModel.find(
	{
		createdAt: {
			$gte: new Date(startDate).toISOString(),
			$lt: new Date(endDate).toISOString(),
		},
		city: city
	}, (err, res) => {
			if(err) {
				console.log('err', err)
			}
			return res.slice().sort((a, b) => b.createdAt - a.createdAt)
		})
}

module.exports = {
	syncData,
	getProperties
}