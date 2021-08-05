const express = require('express');
const requireSignIn = require('../middlewares/requireSignIn');
const controller = require('./../controllers/experience');
const {validateCurrExp,isValidated,validatePastExp} = require('./../validations/user');

const router = express.Router({mergeParams:true});

router.route('/').post(validateCurrExp,isValidated,requireSignIn,controller.addExp);
router.route('/').get(requireSignIn,controller.getExp);
router.route('/past').post(validatePastExp,isValidated,requireSignIn,controller.addPast);
router.route('/past/:pastExpId').patch(requireSignIn,controller.updatePastExp);


module.exports = router ;