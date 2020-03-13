const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
	group_name: { type: String, require: true },
    coins: { type: Number, require: true },
    highest_morale: { type: Number, require: true }
}, { timestamps: true });

module.exports = mongoose.model('scores', ScoreSchema);