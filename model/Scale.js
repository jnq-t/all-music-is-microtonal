import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const scaleSchema = new Schema({
	name: String,  
	author: String,
	isPreset: Boolean,
	scaleDegrees: Array, 
    sustainMode: Boolean,
	startingFreq: Number,
	periodRatio: Object
});

const Scale = model('Scale', scaleSchema);
export default Scale;