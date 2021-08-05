const express = require('express');
const {uploadHandler,uploadS3} = require('./../utils/upload');
const requireSignIn = require('./../middlewares/requireSignIn');
const accessAllowed = require('./../middlewares/accessAllowed');

const router = express.Router();

router.route('/').post(requireSignIn,accessAllowed('admin'),uploadHandler,uploadS3);

module.exports = router;