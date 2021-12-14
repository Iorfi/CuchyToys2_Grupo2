const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router()

router.get('/:of?', mainController.home)
module.exports = router;