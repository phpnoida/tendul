const express = require('express');
const multer = require('multer');
const upload = multer();
const controller = require('./../controllers/category');
const requireSignIn = require('./../middlewares/requireSignIn');
const accessAllowed = require('./../middlewares/accessAllowed');

const router = express.Router();
router.route('/category').post(requireSignIn,accessAllowed('admin'),controller.postModule);
router.route('/categories').get(controller.getAll);
router.route('/category/update').post(upload.none(),controller.updateCategories);


module.exports = router;