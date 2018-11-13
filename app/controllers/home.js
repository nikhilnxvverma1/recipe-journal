const express = require('express');
const application = express();
const router = express.Router();
const ServiceLayer = require('../ServiceLayer.js').ServiceLayer;

const serviceLayer = new ServiceLayer();

module.exports = (app) => {
  app.use('/', router);
};

//GET request for homepage
router.get('/', (req, res, next) => {
  console.log("App started");
  response.send('Hello App');
});

//GET request for getAllRecipe
router.get('/api/v1/get-all-recipe', function (request, response) {
  console.log("Route for getAllRecipe - GET");
  response.send('getAllRecipe - GET');
});

//GET request for getRecipes
router.get('/api/v1/get-recipe/:id/:pm1/:pm2', function (request, response) {
  console.log("Route for getRecipe - GET\n URL Params \n%s\n%s\n%s\n", 
  request.params.id, request.params.pm1, request.params.pm2);
  var resString = "getOneRecipe - GET\n";
  resString += 'URL Params \n';
  resString += request.params.id;
  resString += '\n'; 
  resString += request.params.pm1;
  resString += '\n'; 
  resString += request.params.pm2;
  response.send(resString);
});

//POST request for addNewRecipe
router.post('/api/v1/add-recipe', function (request, response) {
  console.log("Route for addRecipe - POST");
  // serviceLayer.addRecipe
});

//PUT request for editRecipe
router.put('/api/v1/edit-recipe', function (request, response) {
  console.log("Route for editRecipe - PUT");
  response.send('editRecipe - PUT');
});

//DELTE request for deleteRecipe
router.delete('/api/v1/delete-recipe', function (request, response) {
  console.log("Route for deleteRecipe - DELTE");
  response.send('deleteRecipe - DELETE');
});

//GET request for search
router.get('/api/v1/search', function (request, response) {
  console.log("Route for search - GET \n URL Params \n%s\n%s\n%s\n", 
          request.query.id, request.query.pm1, request.query.pm2);
  var resString = "search - GET\n";
  resString += 'URL Params \n';
  resString += request.query.id;
  resString += '\n'; 
  resString += request.query.pm1;
  resString += '\n'; 
  resString += request.query.pm2;
  response.send(resString); 
});

//PUT request for setAsFavourite
router.put('/api/v1/favourite', function (request, response) {
  console.log("Route for favourites - PUT");
  response.send(serviceLayer.setAsFavourite(request.query.id));
  })
