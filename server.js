require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const db = require('./app/models');

// force 'true' for developent mode because drop all table
db.sequelize.sync({ force: true }).then(() => {
	console.log('Drop and re-sync database!');
});

app.use(cors());
app.use(fileUpload());
app.use(express.static('./public'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// define routes
const brandRouter = require('./routes/brand');
const productRouter = require('./routes/product');
const outletRouter = require('./routes/outlet');

// use routes
app.use('/brand', brandRouter);
app.use('/product', productRouter);
app.use('/outlet', outletRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
