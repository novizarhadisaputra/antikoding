const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/product.controller');
const validation = require('../app/helpers/validation');

const validationCreate = {
	name: 'required|unique',
	picture: 'file',
	price: 'required',
	brandId: 'required'
};
const validationUpdate = {
	name: 'required',
	price: 'required',
	brandId: 'required'
};
// Explanation: A nameless path GET request without any parameters.
// We'll learn how to name a path in users route.
router.get('/', [ productController.findAll ]);
router.get('/:id', [ productController.findOne ]);
router.post('/create', [ validation.check(validationCreate, 'products'), productController.create ]);
router.post('/:id/update', [ validation.check(validationUpdate, 'products'), productController.update ]);
router.delete('/:id/delete', [ productController.delete ]);

module.exports = router;
