module.exports = app => {
    const provinces = require("../controllers/province.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Country
    router.post("/", provinces.create);
  
    // Retrieve all Countries
    router.get("/", provinces.findAll);
  
    // Retrieve a single Country with id
    router.get("/:id", provinces.findOne);
  
    // Update a Country with id
    router.put("/:id", provinces.update);
  
    // Delete a Country with id
    router.delete("/:id", provinces.delete);
  
    // Delete all Countries
    router.delete("/", provinces.deleteAll);
  
    app.use('/api/provinces', router);
  };