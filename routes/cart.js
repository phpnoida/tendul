const express = require('express');
const requireSignIn = require('../middlewares/requireSignIn');
const controller = require('./../controllers/cart');

const router = express.Router();

router.route('/cart').post(requireSignIn,controller.addItems);
router.route('/carts').get(requireSignIn,controller.getCart)

module.exports = router;