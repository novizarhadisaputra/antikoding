const express = require('express');
const router = express.Router();
const outletController = require('../app/controllers/outlet.controller');
const validation = require('../app/helpers/validation');

const validationCreate = {
	name: 'required|unique',
	picture: 'file',
	address: 'required',
	longitude: 'required',
	latitude: 'required'
};
const validationUpdate = {
	name: 'required',
	address: 'required',
	longitude: 'required',
	latitude: 'required'
};
// Explanation: A nameless path GET request without any parameters.
// We'll learn how to name a path in users route.
router.get('/', [ outletController.findAll ]);
router.get('/:id', [ outletController.findOne ]);
router.post('/create', [ validation.check(validationCreate, 'outlets'), outletController.create ]);
router.post('/:id/update', [ validation.check(validationUpdate, 'outlets'), outletController.update ]);
router.delete('/:id/delete', [ outletController.delete ]);

module.exports = router;
