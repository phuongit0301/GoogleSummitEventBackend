const express = require('express');
const router = express.Router();

const Question = require('../models/question-model');

// router param
router.param('qID', (req, res, next, id) => {
  Question.findById(id, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      err = new Error('Document not found');
      err.status = 404;
      return next(err);
    }
    req.question = doc;
    return next();
  });
});

const getQuestions = (req, res) => {
    Question.find({}).sort({ createdAt: -1 }).exec((err, questions) => {
        if (err) return next(err);
        res.json(questions);
    });
}

const createQuestion = (req, res) => {
    const question = new Question(req.body);
    question.save((err, question) => {
        if (err) return next(err);
        res.status(201);
        res.json(question);
    });
}