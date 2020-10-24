const db = require('../models');
const Outlet = db.outlets;
const Op = db.Sequelize.Op;
const fileHelper = require('../helpers/file');

// Create and Save a new Outlet
exports.create = async (req, res) => {
	try {
		const data = {
			name: req.body.name,
			picture: await fileHelper.uploadFile(req, res, 'picture'),
			address: req.body.address,
			longitude: req.body.longitude,
			latitude: req.body.latitude,
			brandId: req.body.brandId
		};
		let newOutlet = await Outlet.create(data);
		return res.status(200).json({
			message: 'Outlet created',
			data: newOutlet
		});
	} catch (error) {
		res.status(500).json({
			errors: error.message
		});
	}
};

// Retrieve all Outlets from the database.
exports.findAll = async (req, res) => {
	try {
		const outlets = await Outlet.findAll();
		return res.status(200).json({
			message: 'List Outlet',
			data: outlets
		});
	} catch (error) {
		return res.status(500).json({
			errors: error.message || 'Some error occurred while retrieving outlets.'
		});
	}
};

// Find a single Outlet with an id
exports.findOne = async (req, res) => {
	try {
		const outlet = await Outlet.findOne({
			where: {
				id: req.params.id
			}
		});
		if (outlet === null) return res.status(404).json({
			message: 'Page not found'
		});
		return res.status(200).json({
			message: 'Detail Outlet',
			data: outlet
		});
	} catch (error) {
		return res.status(500).json({
			errors: error.message || 'Some error occurred while retrieving outlets.'
		});
	}
};

// Update a Outlet by the id in the request
exports.update = async (req, res) => {
	try {
		const outlet = await Outlet.findOne({
			where: {
				id: req.params.id
			}
		});
		if (outlet === null) return res.status(404).json({
			message: 'Page not found'
		});
		const unique = await Outlet.findOne({
			where: {
				name: req.body.name
			}
		});
		outlet.name = outlet.name != req.body.name ? (unique === null ? req.body.name : outlet.name) : outlet.name;
		outlet.picture =
			!req.files ? outlet.picture : await fileHelper.uploadFile(req, res, 'picture', outlet);
		outlet.address = outlet.address != req.body.address ? req.body.address : outlet.address;
		outlet.latitude = outlet.latitude != req.body.latitude ? req.body.latitude : outlet.latitude;
		outlet.longitude = outlet.longitude != req.body.longitude ? req.body.longitude : outlet.longitude;
		outlet.brandId = outlet.brandId != req.body.brandId ? req.body.brandId : outlet.brandId;
		await outlet.save();
		return res.status(200).json({
			message: 'Update Success',
			data: outlet
		});
	} catch (error) {
		return res.status(500).json({
			errors: error.message || 'Some error occurred while retrieving outlets.'
		});
	}
};

// Delete a Outlet with the specified id in the request
exports.delete = async (req, res) => {
	try {
		const outlet = await Outlet.findOne({
			where: {
				id: req.params.id
			}
		});
		if (outlet === null) return res.status(404).json({
			message: 'Page not found'
		});
		await fileHelper.removeFile(outlet.picture);
		await outlet.destroy();
		return res.status(200).json({
			message: 'Remove Success',
			data: outlet
		});
	} catch (error) {
		return res.status(500).json({
			errors: error.message || 'Some error occurred while retrieving outlets.'
		});
	}
};