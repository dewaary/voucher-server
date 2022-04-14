var express = require('express');
var router = express.Router();
const {viewSign, actionSignin, actionLogout} = require('./controller')

/* GET home page. */
router.get('/', viewSign);
router.post('/', actionSignin);
router.get('/logout', actionLogout);

module.exports = router;
