const express = require('express');
const auth = require('../controllers/auth');
const {validateSignUp,validateSignIn,isValidated} = require('../validations/auth');
const contactRoute = require('./contact');
const expRoute = require('./experience');

const router = express.Router();

router.use('/contact',contactRoute);
router.use('/exp',expRoute);

router.route('/signUp').post(validateSignUp,isValidated,auth.signUp);
router.route('/signIn').post(validateSignIn,isValidated,auth.signIn);



module.exports = router;