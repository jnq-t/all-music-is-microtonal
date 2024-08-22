const mongoose = require('mongoose');
const { Schema } = mongoose;


const scaleDegreeModifierSchema = new Schema({
	scaleId: {
		 type: mongoose.Schema.Types.ObjectId,
   		 ref: 'Scale'
	},
	ratioToFundamentalDenominator: {
		type: Number,
	},
	ratioToFundamentalNumerator: {
		type: Number,
	},
	detuneByCents: {
		type: Number,
	},
	scaleDegreePosition: {
		type: Number,
	},
});

module.exports = ScaleDegreeModifier = mongoose.model('ScaleDegreeModifier', scaleDegreeModifierSchema);