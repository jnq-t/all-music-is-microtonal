// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;


const scaleSchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	author: {
		type: String,
		default: ""
	},
	
	period: {
		type: float,
		default: 2,
		required: true
	},
	
	length: {
		type: Number,
		default: 12,
		required: true
	},
	
	isPreset: {
		type: Boolean,
		default: false,
		required: true
	},
	sustainMode: {
		type: Boolean,
		default: false,
		required: true
	},
	startingFreq: {
		type: Number,
		default: 240,
		required: true
	},
	periodRatio: {
		type: Object,
		default: { numerator: 2, denominator: 1 },
		required: true
	},
});

module.exports = Scale = mongoose.model('scale', scaleSchema);