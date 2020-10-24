const slug = require('slug');
const fs = require('fs');
const { url } = require('inspector');

exports.uploadFile = async (req, res, name, data = null) => {
	if (data !== null) {
		fs.unlinkSync(data[name]);
	}
	let file = req.files[name];
	let ext = file.mimetype.split('/')[1];
	let filePath = `public/files/${slug(Date.now() + ' ' + name)}.${ext}`;
	file.mv(filePath, function(err) {
		if (err) throw res.status(400).send({ message: err });
	});
	return filePath;
};

exports.removeFile = async (url) => {
	if (url !== null) {
		fs.unlinkSync(url);
	}
};
