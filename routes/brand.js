const express = require('express');
const router = express.Router();
const brandController = require('../app/controllers/brand.controller');
const validation = require('../app/helpers/validation');

const validationCreate = {
	name: 'required|unique',
	banner: 'file',
	logo: 'file'
};
const validationUpdate = {
	name: 'required',
};
// Explanation: A nameless path GET request without any parameters.
// We'll learn how to name a path in users route.
router.get('/', [ brandController.findAll ]);
router.get('/:id', [ brandController.findOne ]);
router.post('/create', [ validation.check(validationCreate, 'brands'), brandController.create ]);
router.post('/:id/update', [ validation.check(validationUpdate, 'brands'), brandController.update ]);
router.delete('/:id/delete', [ brandController.delete ]);

module.exports = router;
