
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');

const app = express();
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const countryString = fs.readFileSync('./app/data/country.json');
const country_data = JSON.parse(countryString);
const provinceString = fs.readFileSync('./app/data/province.json');
const province_data = JSON.parse(provinceString);

db.sequelize.sync({force:true})
  .then((res) => {
    db.countries.bulkCreate(country_data, { validate: true }).then(() => {
      db.provinces.bulkCreate(province_data, { validate: true }).then(() => {
          db.countries.findAll({
              where: {
                  id: 1
              },
              include: [{
                  model: db.provinces
              }]
          }).then(result => {
              console.dir(result, { depth: 5 });
          }).catch((error) => {
              console.error('Failed to retrieve data : ', error);
          });
      }).catch((err) => { console.log(err); });
    }).catch((err) => { console.log(err); });
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

require("./app/routes/country.routes")(app);
require("./app/routes/province.routes")(app);
app.use(
  '/api/doc',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});