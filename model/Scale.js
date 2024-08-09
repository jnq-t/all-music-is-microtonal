import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const scaleSchema = new Schema({
	name: {
		type: String,
		default: "",
	},
	author: {
		type: String,
		default: ""
	},
	isPreset: {
		type: Boolean,
		default: false,
		required: true
	},
	scaleDegrees: {
		type: Array,
		default: []
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

const Scale = model('Scale', scaleSchema);
export default Scale;
