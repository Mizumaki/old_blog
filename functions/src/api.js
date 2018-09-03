const express = require('express');
const api = express();

const router = require('./api/article-list/routes');
api.use('/api/article-list', router);

module.exports = api;