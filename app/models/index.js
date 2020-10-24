const dbConfig = require('../config/database');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: 0,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.outlets = require('./outlet.model.js')(sequelize, Sequelize);
db.products = require('./product.model.js')(sequelize, Sequelize);
db.brands = require('./brand.model.js')(sequelize, Sequelize);

db.brands.hasMany(db.outlets, { as: 'outlet', foreignKey: 'brandId' });
db.outlets.belongsTo(db.brands, {
	foreignKey: 'brandId'
});
db.brands.hasMany(db.products, { as: 'product', foreignKey: 'brandId' });
db.products.belongsTo(db.brands, {
	foreignKey: 'brandId'
});

module.exports = db;
