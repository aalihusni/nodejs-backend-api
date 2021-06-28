const Router = require('express-group-router');
let router = new Router();

const {body} = require('express-validator/check');

const paymentController = require('../controllers/payment');

router.group('/payment', [], (router) => {
    router.post('/try', function (req, res, next) {
        paymentController.confirmPayment(req, res, next).then(r => {})
    });
    router.get('/list', function (req, res, next) {
        paymentController.getPayment(req, res, next)
    });
});
module.exports = router;
