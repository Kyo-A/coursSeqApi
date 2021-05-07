const controller = require("../controllers/rocket.controller");

module.exports = function(app) {
    
    // http://localhost:8080/api/?page=0
    // http://localhost:8080/api/?size=5
    // http://localhost:8080/api/?page=0&size=5
    // http://localhost:8080/api/?organisation=SPACEX
    // http://localhost:8080/api/?organisation=SPACEX&size=1
    app.get("/api/", controller.getPagingRockets);

    app.get("/api/rockets", controller.getRockets);

    app.get("/api/rockets/:id",controller.getRocketById);
 
    app.post("/api/rockets",controller.createRocket);
  
    app.put("/api/rockets/:id",controller.updateRocket);

    app.delete("/api/rockets/:id",controller.deleteRocket);

    app.delete("/api/rockets",controller.deleteAll);

  };