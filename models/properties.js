const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertyModel = new Schema({
    // _id: String,
	createdAt: String,
	modifiedAt: String,
	gpsCoord: Object,
	city: String,
	offerType: String,
	type: String,
	arrangement: String,
	price: String,
	priceCurrency: String,
	priceType: String,
	url: String,
	imageUrls: Array,
});

module.exports = mongoose.model('properties', PropertyModel);
