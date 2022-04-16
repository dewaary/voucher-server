var express = require('express');
const { isLoginAdmin } = require('../middleware/auth');
var router = express.Router();
const {index, actionStatus} = require('./controller')

/* GET home page. */
router.use(isLoginAdmin)
router.get('/', index);
router.put('/status/:id', actionStatus);

module.exports = router;
