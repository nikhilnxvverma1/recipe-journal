const express = require('express');
const router = express.Router();
const db = require('../models');

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
router.get('/api/v1/get-all-recipe', function (request, response) {
  db.Recipe.findAll().then((recipes)=>{

    response.render('all-recipe-page', {
      recipes:recipes,
      layout:"header-body-footer"
    })
  });
});

//GET request for getRecipes
router.get('/api/v1/get-recipe', function (request, response) {
  db.Recipe.findAll({
    where:{
      id:request.query.id
    }
  }).then((recipe)=>{
    response.render('recipe-detail', {
      recipe:recipe,
      layout:"header-body-footer"
    })
  });
});

//POST request for addNewRecipe
router.post('/api/v1/add-recipe', function (request, response) {
  var favourite = false;
  var vegetarian = false;
  if(request.body.favourite !== "undefined" && request.body.favourite === "on")
    favourite = true;

  if(request.body.vegetarian !== "undefined" && request.body.vegetarian === "on")
    vegetarian = true;

    db.Recipe.create({
      title: request.body.title,
      teaserText: request.body.teaserText,
      instructions: request.body.instructions,
      cookingTime: request.body.cookingTime,
      previewUrl: request.body.previewUrl,
      favourite: favourite,
      preparationTime: request.body.preparationTime,
      postDate: request.body.postDate,
      course: request.body.course,
      vegetarian: vegetarian,
  }).then((insertedRecipe)=> {
      response.redirect("get-all-recipe");
  });

});

//PUT request for editRecipe
router.put('/api/v1/edit-recipe', function (request, response) {
  db.Recipe.update({
    title: request.query.title,
    teaserText: request.query.teaserText,
    instructions: request.query.instructions,
    cookingTime: request.query.cookingTime,
    previewUrl: request.query.previewUrl,
    favourite: request.query.favourite,
    preparationTime: request.query.preparationTime,
    course: request.query.course,
    vegetarian: request.query.vegetarian
  }, 
  {
    where: {
      id: request.query.id
    }
  }
  ).then ((recipe)=> {
    response.send(recipe);
  });
});

//DELTE request for deleteRecipe
router.delete('/api/v1/delete-recipe', function (request, response) {
  db.Recipe.destroy({
    where: {
      id:request.query.id
    }
  }).then((deletedRecord)=>{
    if(deletedRecord === 1) {
      response.send("Record deleted successfully");
    } else {
      response.send("Record not found");
    }
  });
  
});

//GET request for search
router.get('/api/v1/search', function (request, response) {
  db.Recipe.findAll({
    where: {
      [Op.or]: [
        {id: request.query.id},
        {title: request.query.text},
        {teaserText: request.query.text},
        {instructions: request.query.text},
        {cookingTime: request.query.cookingTime},
        {previewUrl: request.query.previewUrl},
        {favourite: request.query.favourite},
        {preparationTime: request.query.preparationTime},
        {course: request.query.course},
        {vegetarian: request.query.vegetarian}
      ]
    }
  }).then ((searchResults)=> {
    response.setHeader('Content-Type', 'application/json');
    response.send(searchResults);
  });
});

//PUT request for setAsFavourite
router.put('/api/v1/favourite', function (request, response) {
  console.log("favourite");
  db.Recipe.find({
    where: {
      id:request.query.id
    }
  }).then((recipe)=>{
    db.Recipe.update(
      {
        favourite: !recipe.favourite
      },
      {
        where: {
          id: request.query.id
        }
      }
    ).then((recipe)=>{
      response.send(recipe);
    });
  });
});

router.get('/api/v1/get-all-favourites', function (request, response) {
  db.Recipe.findAll({
    where: {
      favourite:1
    }
  }).then((recipes)=>{
    response.setHeader('Content-Type', 'application/json');
    response.send(recipes);
  });
})

router.get('/api/v1/add-new-recipe', function (request, response) {
  response.render('add-new-recipe', { 
  layout:"header-body-footer"});
});