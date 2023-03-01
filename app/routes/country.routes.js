module.exports = app => {
    const countries = require("../controllers/country.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Country
    router.post("/", countries.create);
  
    // Retrieve all Countries
    router.get("/", countries.findAll);
  
    // Retrieve a single Country with id
    router.get("/:id", countries.findOne);
  
    // Update a Country with id
    router.put("/:id", countries.update);
  
    // Delete a Country with id
    router.delete("/:id", countries.delete);
  
    // Delete all Countries
    router.delete("/", countries.deleteAll);
  
    app.use('/api/countries', router);
  };