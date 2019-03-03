const express = require('express');
const router = express.Router();
const db = require('../models');
const recipeModule = require('../recipeLogicModule');

const Op = db.Sequelize.Op;

module.exports = (app) => {
  app.use('/', router);
};

//GET request for homepage
router.get('/', (req, res, next) => {
res.render('index', {
  title:"HELLO WORLD",
  layout:"header-body-footer"
})
});

//GET request for getAllRecipe
router.get('/api/v1/get-all-recipe', recipeModule.getAllRecipe);

//GET request for getRecipes
router.get('/api/v1/get-recipe', recipeModule.getRecipe);

//POST request for addNewRecipe
router.post('/api/v1/add-recipe',recipeModule.addNewRecipe);

//PUT request for editRecipe
router.put('/api/v1/edit-recipe', recipeModule.editRecipe);

//DELTE request for deleteRecipe
router.delete('/api/v1/delete-recipe', recipeModule.deleteRecipe);

//GET request for search
router.get('/api/v1/search', recipeModule.searchRecipe);

//PUT request for setAsFavourite
router.put('/api/v1/favourite', recipeModule.setAsFavourite);

router.get('/api/v1/get-all-favourites', recipeModule.getAllFavourites)

//Open the add new recipe form page
router.get('/api/v1/add-new-recipe', function (request, response) {
  response.render('add-new-recipe', { 
  layout:"header-body-footer"});
});

//Open the edit recipe form page
router.get('/api/v1/edit-recipe-details', function (request, response) {
  db.Recipe.findAll({
    where:{
      id:request.query.id
    }
  }).then((recipe)=>{
    response.render('edit-recipe-form', {
      recipe:recipe,
      layout:"header-body-footer"});
  })
})