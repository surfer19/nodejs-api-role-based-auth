require('rootpath')();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Mongoose = require("mongoose");
const cron = require('node-cron');
const fetch = require('node-fetch');
const errorHandler = require('_helpers/error-handler');
const configDB = require('./config/database.js');
// const userController = require('users/users.controller');
// const policieController = require('policies/policies.controller');
const propertyController = require('properties/properties.controller');
const PropertyModel = require('models/property')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

Mongoose.connect(configDB.url, { useNewUrlParser: true });

var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to DB!')
  insertToDB();
});

const insertToDB = () => {
	console.log('Syncing data...');
	// call internal endpoint
	fetch('http://localhost:4000/properties/sync')
		.then(async result => {
			const res = (await result.json());
			const parsed = res.map(item => ({
				createdAt: item.createdAt,
				gpsCoord: item.data.gpsCoord,
				city: item.data.city,
				offerType: item.data.offerType,
				type: item.data.type,
				arrangement: item.data.arrangement,
				price: item.data.price,
				priceCurrency: item.data.priceCurrency,
				priceType: item.data.priceType,
				url: item.data.url,
				imageUrls: item.data.imageUrls,
				title: item.data.title,
				livingArea: item.data.livingArea
			}));
			// delete all records
			PropertyModel.deleteMany({}, err => err);
			PropertyModel.insertMany(parsed, (err, inserted) => {
				if (!err) {
					console.log('Success sync!',);
				}
				else {
					console.log('Err sync', err);
				}
			});
		})
}

var task = cron.schedule('0 * * * *', () => {
	insertToDB();
});
// use our middleware
// app.use('/users', userController);
// app.use('/policies', policieController);
app.use('/properties', propertyController)
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});