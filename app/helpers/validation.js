const db = require('../models');

exports.check = (fields, tables) => {
	return async function(req, res, next) {
		let messages = [];
		for (const key in fields) {
			if (fields.hasOwnProperty(key)) {
				const element = await fields[key];
				if (element.includes('unique')) {
					let unique = await isUnique(req, key, tables);
					if (unique) messages.push(unique);
				}
				if (element.includes('required')) {
					let required = await isRequired(req, key, tables);
					if (required) messages.push(required);
				}
				if (element.includes('file')) {
					let required = await isFileRequired(req, key, tables);
					if (required) messages.push(required);
				}
			}
		}
		if (messages.length > 0) return res.status(400).json({ errors: messages });
		next();
	};
};

async function isUnique(req, key, tables) {
	let conditional = {};
	conditional[key] = req.body[key] ? req.body[key] : req.query[key];
	const data = await db[tables].findOne({ where: conditional });
	if (data !== null) {
		return { field: key, error: `${key} must be unique` };
	}
	return false;
}

async function isRequired(req, key) {
	const data = req.body[key] ? req.body[key] : req.query[key];
	if (data === undefined) return { field: key, error: `${key} is required` };
	return false;
}

async function isFileRequired(req, key) {
	if (!req.files) {
		return { field: key, error: `file ${key} is required` };
	}
	if(req.files[key] === undefined || req.files[key] === '')
	{
		return { field: key, error: `file ${key} is required` };
	}
	return false;
}
