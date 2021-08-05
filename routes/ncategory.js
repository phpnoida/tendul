const express = require('express');
const controller = require('./../controllers/ncategory');

const router = express.Router();

router.route('/ncategory').post(controller.createCategory);
router.route('/ncategories/:slug').get(controller.getCategoryBySlug);
router.route('/ncategories').get(controller.getAllCategory);
router.route('/catdescendant').get(controller.getDescendant);
router.route('/ncategory/:categoryId').delete(controller.deleteCategory);


module.exports = router;