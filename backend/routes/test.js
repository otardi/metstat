var express = require('express');
var router = express.Router();

/* GET employee. */
router.get('/', function (req, res, next) {
    res.send('Page de test');
});

module.exports = router;