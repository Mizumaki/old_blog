const express = require('express');
const router = express.Router();

router.use('/category', require('./category'));
//router.use('/tags', require('./tags'));

module.exports = router;