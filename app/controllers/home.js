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
  var favourite = false;
  var vegetarian = false;
  if(request.body.favourite !== "undefined" && request.body.favourite === "on")
    favourite = true;

  if(request.body.vegetarian !== "undefined" && request.body.vegetarian === "on")
    vegetarian = true;

  db.Recipe.update({
    title: request.body.title,
    teaserText: request.body.teaserText,
    instructions: request.body.instructions,
    cookingTime: request.body.cookingTime,
    previewUrl: request.body.previewUrl,
    favourite: favourite,
    preparationTime: request.body.preparationTime,
    course: request.body.course,
    vegetarian: vegetarian
  }, 
  {
    where: {
      id: request.query.id
    }
  }
  ).then ((recipe)=> {
    // response.send(recipe);
    response.redirect("get-all-recipe");
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

  var title = "";
  var teaserText = "";
  var favourite = false;
  var vegetarian = false;

  var obj = " [Op.or]: {";

  if(request.query.title !== "undefined" && request.query.title !== "")
    obj += "title : {[Op.like]:" + '%' + request.query.title + '%' + "}";

  if(request.query.teaserText !== "undefined" && request.query.teaserText !== "") {
    obj += ",";
    obj += "teaserText: {[Op.like]:" + '%' + request.query.teaserText + '%' + "}";
  }

  if(request.query.cookingTime !== "undefined" && request.query.cookingTime !== "") {
    obj += ",";
    obj += "cookingTime: {[Op.lt]: " + request.query.cookingTime + "}";
  }

  if(request.query.favourite !== "undefined" && request.query.favourite === "on") {
    obj += ",";
    obj += "favourite: true";
  }

  if(request.query.preparationTime !== "undefined" && request.query.preparationTime !== "") {
    obj += ",";
    obj += "preparationTime: {[Op.lt]: " + request.query.preparationTime + "}";
  }

  if(request.query.course !== "undefined" && request.query.course !== "") {
    obj += ",";
    obj += "course: " + request.query.course;
  }

  if(request.query.vegetarian !== "undefined" && request.query.vegetarian === "on") {
    obj += "vegetarian: true";
  }

  obj+="}";
  
  var jsonClause = JSON.parse(obj);
  db.Recipe.findAll({
    where: {
      jsonClause
    }
  }).then ((searchResults)=> {
    response.render('all-recipe-page', {
      recipes:searchResults,
      layout:"header-body-footer"
    })  
  });
});

router.get('api/v1/execute-favourite', function (request, response) {
  request.url = '/api/v1/favourite';
  request.method = 'PUT';

  return router.handle(request, response);
})

//PUT request for setAsFavourite
var setAsFavourite = function (request, response) {
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
      response.setHeader('Content-Type', 'application/json');
      response.send(recipe);
    });
  });
}
router.put('/api/v1/favourite', setAsFavourite);

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