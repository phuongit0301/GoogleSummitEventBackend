const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
	title: { type: String, require: true },
	cost: { type: Number, require: true },
	coinsIncrement: { type: Number, require: true },
}, { timestamp: true });

module.exports = mongoose.model('answers', AnswerSchema);