const db = require('../models');
const Product = db.products;
const Op = db.Sequelize.Op;
const fileHelper = require('../helpers/file');
const { products } = require('../models');
// Create and Save a new Product
exports.create = async (req, res) => {
	try {
		const data = {
			name: req.body.name,
			picture: await fileHelper.uploadFile(req, res, 'picture'),
			price: req.body.price,
			brandId: req.body.brandId
		};
		let newProduct = await Product.create(data);
		return res.status(200).json({
			message: 'Product created',
			data: newProduct
		});
	} catch (error) {
		res.status(500).json({
			errors: error.message
		});
	}
};

// Retrieve all Products from the database.
exports.findAll = async (req, res) => {
	try {
		const products = await Product.findAll();
		return res.status(200).json({
			message: 'List Product',
			data: products
		});
	} catch (error) {
		return res.status(500).json({
			errors: error.message || 'Some error occurred while retrieving products.'
		});
	}
};

// Find a single Product with an id
exports.findOne = async (req, res) => {
	try {
		const product = await Product.findOne({
			where: {
				id: req.params.id
			}
		});
		if (product === null)
			return res.status(404).json({
				message: 'Page not found'
			});
		return res.status(200).json({
			message: 'Detail Product',
			data: product
		});
	} catch (error) {
		return res.status(500).json({
			errors: error.message || 'Some error occurred while retrieving products.'
		});
	}
};

// Update a Product by the id in the request
exports.update = async (req, res) => {
	try {
		const product = await Product.findOne({
			where: {
				id: req.params.id
			}
		});
		if (product === null)
			return res.status(404).json({
				message: 'Page not found'
			});
		const unique = await Product.findOne({
			where: {
				name: req.body.name
			}
		});
		if (product.name != req.body.name && unique !== null) res.status(400).json({ erros: 'name must be unique' });
		product.name = product.name != req.body.name ? req.body.name : product.name;
		product.picture = !req.files ? product.picture : await fileHelper.uploadFile(req, res, 'picture', product);
		product.price = product.price != req.body.price ? req.body.price : product.price;
		product.brandId = product.brandId != req.body.brandId ? req.body.brandId : product.brandId;
		await product.save();
		return res.status(200).json({
			message: 'Update Success',
			data: product
		});
	} catch (error) {
		return res.status(500).json({
			errors: error.message || 'Some error occurred while retrieving products.'
		});
	}
};

// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {
	try {
		const product = await Product.findOne({
			where: {
				id: req.params.id
			}
		});
		if (product === null)
			return res.status(404).json({
				message: 'Page not found'
			});
		await fileHelper.removeFile(product.picture);
		await product.destroy();
		return res.status(200).json({
			message: 'Remove Success',
			data: product
		});
	} catch (error) {
		return res.status(500).json({
			errors: error.message || 'Some error occurred while retrieving products.'
		});
	}
};
