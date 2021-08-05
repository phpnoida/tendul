const express = require('express');
const controller = require('./../controllers/product');
const requireSignIn = require('./../middlewares/requireSignIn');
const accessAllowed = require('./../middlewares/accessAllowed');

const router = express.Router();

router.route('/product').post(requireSignIn,accessAllowed('admin'),controller.createProduct);
router.route('/products').get(controller.getAll);
router.route('/products/:slug').get(controller.getAllBySlug);

module.exports = router;