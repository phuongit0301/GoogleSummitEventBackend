const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = require('./answer-model');

const QuestionSchema = new Schema({
	title: { type: String, require: true },
	answers: [AnswerSchema]
}, { timestamps: true });

module.exports = mongoose.model('questions', QuestionSchema);