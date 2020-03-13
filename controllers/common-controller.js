var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
const auth = require('../helpers/google-auth');
const slides = require('../helpers/google-slides');
const Score = require('../models/score-model');


async function createExcel(req, res) {
	var doc = new GoogleSpreadsheet('1kjHhR5_qwwgDiykdVwRZ-TFXzp2ZKCLJuTAz-C2jhcw');
	const body = req.body;
	var sheet = null;

	if (!body) {
		return res.status(400).json({
			success: false,
			message: 'You must provide a group',
		});
	}

	let score = await Score.findOne({ "group_name": `${body.group_name}` });
	
	if (score && Object.keys(score).length > 0) {
		let query = { /* query object to find records that need to be updated */
			"_id": score._id,
		};
		let update = { /* the replacement object */
			"$set": body
		};
		const updateScore = await Score.updateOne(query, update);
		if(!updateScore) {
			return res.status(400).json({
				error,
				message: 'Score not created!',
			})
		}
		
	} else {
		score = new Score(body);
		const saveScore = await score.save();
		if(!saveScore) {
			return res.status(400).json({
				error,
				message: 'Score not created!',
			})
		}
	}

	
	const dataScore = await Score.find({}).sort({ coins: -1 });

	async.series([
		function setAuth(step) {
			var creds = require('../config/client_secret.json');

			doc.useServiceAccountAuth(creds, step);
		},
		function getInfoAndWorksheets(step) {
			doc.getInfo(function (err, info) {
				sheet = info.worksheets[0];
				step();
			});
		},
		function workingWithRows(step) {
			// google provides some query options
			sheet.getRows({
				offset: 1,
			}, function (err, rows) {
				doc.addRow(1, body, function (error) {
					if (error) {
						return res.status(400).json({
							success: false,
							message: 'You must provide a group',
						});
					}
				});
				step();
			});
		},
		function workingWithSlides(step) {
			auth.getClientSecrets()
				.then(auth.authorize)
				.then(credentials => slides.createSlides(credentials, body, dataScore))
				.then(() => {
					console.log('-- Finished generating slides. --');
					return res.status(200).json({
						success: true,
						message: 'Created Successfull',
					});
				});
		}
	], function (err) {
		if (err) {
			console.log('Error: ' + err);
		}
	});
}

removeScore = async (req, res) => {
	const score = await Score.deleteMany();
	if(!score) {
		return res.status(400).json({
			error,
			message: 'Score not created!',
		});
	}
	return res.status(200).json({
		success: true,
		message: 'Created Successfull',
	});
}
removeScoreById = async (req, res) => {
	if(!req.body) {
		return res.status(400).json({
			success: false,
			message: 'You must provide a score',
		});
	}
	const score = await Score.findOneAndDelete({ _id: req.body.id });
	if(!score) {
		return res.status(400).json({
			error,
			message: 'Score not delete!',
		});
	}

	return res.status(200).json({
		success: true,
		message: 'Delete Successfull',
		datas: req.body.id
	});
}

getScore = async (req, res) => {
	const score = await Score.find({}).sort({ coins: -1 });
	if(!score) {
		return res.status(400).json({
			error,
			message: 'Score not created!',
		});
	}
	return res.status(200).json({
		success: true,
		message: 'Created Successfull',
		datas: score
	});
}

createSlide = async (req, res) => {
	const dataScore = await Score.find({}).sort({ coins: -1 });
	if(!dataScore) {
		return res.status(400).json({
			error,
			message: 'Score not created!',
		});
	}
	auth.getClientSecrets()
				.then(auth.authorize)
				.then(credentials => slides.generateSlides(credentials, dataScore))
				.then(() => {
					console.log('-- Finished create slides. --');
					return res.status(200).json({
						success: true,
						message: 'Created Successfull',
					});
				});
}

module.exports = {
	createExcel,
	removeScore,
	getScore,
	removeScoreById,
	createSlide
}