module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define('product', {
		name: {
			type: Sequelize.STRING
		},
		picture: {
			type: Sequelize.STRING
		},
		price: {
			type: Sequelize.INTEGER
		},
		brandId: {
			type: Sequelize.INTEGER
		}
	});

	return Product;
};
