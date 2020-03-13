const express = require('express');
const groupRouter = require('./group-router');
const excelRouter = require('./excel-router');


const routerAPI = () => {
  const router = express.Router();
  
  router.route('/group', groupRouter);
  
  router.route('/excel', excelRouter);
  
  return router;
}

module.exports = routerAPI;