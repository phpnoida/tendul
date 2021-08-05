const express = require('express');
const requireSignIn = require('../middlewares/requireSignIn');
const controller = require('./../controllers/contact');

const router = express.Router({mergeParams:true});

router.route('/').post(requireSignIn,controller.addContacts);
router.route('/').get(requireSignIn,controller.getAll);
router.route('/:contactId').get(requireSignIn,controller.getOne);
router.route('/:contactId').delete(requireSignIn,controller.deleteContact);
router.route('/:contactId').put(requireSignIn,controller.updateContact);

module.exports = router;