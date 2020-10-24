module.exports = (sequelize, Sequelize) => {
	const Outlet = sequelize.define('outlet', {
		name: {
			type: Sequelize.STRING
		},
		picture: {
			type: Sequelize.STRING
		},
		address: {
			type: Sequelize.STRING
		},
		longitude: {
			type: Sequelize.DECIMAL
		},
		latitude: {
			type: Sequelize.DECIMAL
		},
		brandId: {
			type: Sequelize.INTEGER
		}
	});

	return Outlet;
};
