const db = require("../models");
const Province = db.provinces;
const Op = db.Sequelize.Op;

// Create and Save a new Province
exports.create = (req, res) => {

  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Province
  const province = {
    name: req.body.name,
    median_age: req.body.median_age,
    population: req.body.population,
    fertility : req.body.fertility,
    average_age: req.body.average_age,
    population : req.body.population,
    information : req.body.information
  };

  // Save Province in the database
  Province.create(province)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Province."
      });
    });
};

// Retrieve all Provinces from the database.
exports.findAll = (req, res) => {
  const query = req.query;

  Province.findAll({ 
    where:  generateQuery(query),
    include: [db.provinces]
   })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Provinces."
      });
    });
};

// Find a single Province with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Province.findByPk(id, {include: [db.provinces]})
    .then(data => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Province with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Province with id=" + id
      });
    });
};

// Update a Province by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Province.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Province was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Province with id=${id}. Maybe Province was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Province with id=" + id
      });
    });
};

// Delete a Province with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Province.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Province was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Province with id=${id}. Maybe Province was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Province with id=" + id
      });
    });
};

// Delete all Provinces from the database.
exports.deleteAll = (req, res) => {
  Province.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Provinces were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Provinces."
      });
    });
};

function generateQuery(query){

  let queryCondition = [];

  Object.keys(query).forEach(key => {
   
    const value = query[key];

    if (value.indexOf(',') > -1) { 
        const [parmone, paramtwo] = value.split(',');
        if(parmone != 0  && paramtwo != 0) {
          condition   = {
              [Op.gt]: parmone,
              [Op.lt]: paramtwo
            }
        } else if(parmone == 0  && paramtwo != 0) {
          condition   = {
            [Op.lt]: paramtwo
          }
        }  else if(parmone != 0  && paramtwo == 0) {
          condition   = {
            [Op.lt]: parmone
          }
        } 
        queryCondition[key] = condition;
      
    } else {
      queryCondition[key]  = key ?  { [Op.like]: `%${value}%` } : null;
    }

  });
  return Object.assign({}, queryCondition);
}
