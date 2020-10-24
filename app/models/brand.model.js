module.exports = (sequelize, Sequelize) => {
	const Brand = sequelize.define('brand', {
		name: {
			type: Sequelize.STRING,
			unique: true
		},
		logo: {
			type: Sequelize.STRING
		},
		banner: {
			type: Sequelize.STRING
		}
	});

	return Brand;
};
