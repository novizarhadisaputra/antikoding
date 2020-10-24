const db = require('../models');
const Brand = db.brands;
const Product = db.products;
const Outlet = db.outlets;
const Op = db.Sequelize.Op;
const fileHelper = require('../helpers/file');
// Create and Save a new Brand
exports.create = async (req, res) => {
	try {
		const data = {
			name: req.body.name,
			logo: await fileHelper.uploadFile(req, res, 'logo'),
			banner: await fileHelper.uploadFile(req, res, 'banner')
		};
		let newBrand = await Brand.create(data);
		return res.status(200).json({
			message: 'Brand created',
			data: newBrand
		});
	} catch (error) {
		res.status(500).json({
			errors: error.message
		});
	}
};

// Retrieve all Brands from the database.
exports.findAll = async (req, res) => {
	try {
		const brands = await Brand.findAll({
			include: [{
				model: Outlet,
				as: "outlet"
			}, {
				model: Product,
				as: "product"
			}]
		});
		return res.status(200).json({
			message: 'List Brand',
			data: brands
		});
	} catch (error) {
		return res.status(500).json({
			errors: error.message || 'Some error occurred while retrieving brands.'
		});
	}
};

// Find a single Brand with an id
exports.findOne = async (req, res) => {
	try {
		const brand = await Brand.findOne({
			where: {
				id: req.params.id
			}
		});
		if (brand === null) return res.status(404).json({
			message: 'Page not found'
		});
		return res.status(200).json({
			message: 'Detail Brand',
			data: brand
		});
	} catch (error) {
		return res.status(500).json({
			errors: error.message || 'Some error occurred while retrieving brands.'
		});
	}
};

// Update a Brand by the id in the request
exports.update = async (req, res) => {
	try {
		const brand = await Brand.findOne({
			where: {
				id: req.params.id
			}
		});
		if (brand === null) return res.status(404).json({
			message: 'Page not found'
		});
		const unique = await Brand.findOne({
			where: {
				name: req.body.name
			}
		});
		brand.name = brand.name != req.body.name ? (unique === null ? req.body.name : brand.name) : brand.name;
		brand.logo = !req.files ? brand.banner : await fileHelper.uploadFile(req, res, 'logo', brand);
		brand.banner =
			!req.files ? brand.banner : await fileHelper.uploadFile(req, res, 'banner', brand);
		await brand.save();
		return res.status(200).json({
			message: 'Update SuccessS',
			data: brand
		});
	} catch (error) {
		return res.status(500).json({
			errors: error.message || 'Some error occurred while retrieving brands.'
		});
	}
};

// Delete a Brand with the specified id in the request
exports.delete = async (req, res) => {
	try {
		const brand = await Brand.findOne({
			where: {
				id: req.params.id
			}
		});
		if (brand === null) return res.status(404).json({
			message: 'Page not found'
		});
		await fileHelper.removeFile(brand.logo);
		await fileHelper.removeFile(brand.banner);
		await brand.destroy();
		return res.status(200).json({
			message: 'Remove Success',
			data: brand
		});
	} catch (error) {
		return res.status(500).json({
			errors: error.message || 'Some error occurred while retrieving brands.'
		});
	}
};