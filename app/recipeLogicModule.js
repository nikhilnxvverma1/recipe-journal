const db = require('./models');
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;

module.exports = {
  getAllRecipe: (request, response) => {
      db.Recipe.findAll().then((recipes)=>{
    
        response.render('all-recipe-page', {
          recipes:recipes,
          layout:"header-body-footer"
        })
      });
  },

  getRecipe: (request, response) => {
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
  },

  addNewRecipe: (request, response) => {
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
  },

  editRecipe: (request, response) => {
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
        response.redirect("get-all-recipe");
      });
  },

  deleteRecipe: (request, response) => {
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
  },

  searchRecipe: (request, response) => {

    var favourite;
    var vegetarian;
    var title, teaserText, course;
    if(request.query.favourite !== "undefined" && request.query.favourite === "on")
      favourite = true;
  
    if(request.query.vegetarian !== "undefined" && request.query.vegetarian === "on")
      vegetarian = true;

    if(request.query.title !== "undefined" && request.query.title !== "")
      title = '%' + request.query.title + '%';
      
    if(request.query.teaserText !== "undefined" && request.query.teaserText !== "")
      teaserText = '%' + request.query.teaserText;

    if(request.query.course !== "undefined" && request.query.course !== "")
      course = '%' + request.query.course + '%';
    

    db.Recipe.findAll({
        where: {
          [Op.or]: [
            Sequelize.where(Sequelize.fn('lower', Sequelize.col('title')), {
              like : Sequelize.fn('lower', title),
            }), 
            Sequelize.where(Sequelize.fn('lower', Sequelize.col('teaserText')), {
              like : Sequelize.fn('lower', teaserText),
            }), 
            {cookingTime:request.query.cookingTime},
            {preparationTime:request.query.preparationTime},
            Sequelize.where(Sequelize.fn('lower', Sequelize.col('course')), {
              like : Sequelize.fn('lower', course),
            }), 
            {favourite:favourite},
            {vegetarian:vegetarian}
          ]
        }
      }).then ((searchResults)=> {
        response.render('all-recipe-page', {
          recipes:searchResults,
          layout:"header-body-footer"
        })  
      });
  },

  setAsFavourite: (request, response) => {
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
          switch(request.query.fromId) {
              case "1": {
              response.render('get-all-recipe', {
                  layout:"header-body-footer"});
              break;
              }
              case "2": {
              response.render('get-recipe', {
                  id: request.query.id,
                  layout:"header-body-footer"});    
                  break;
              }
              default: {
              response.render
              }
          }
          });
      });
  },

  getAllFavourites: (request, response) => {
      db.Recipe.findAll({
        where: {
          favourite:1
        }
      }).then((recipes)=>{
        response.setHeader('Content-Type', 'application/json');
        response.send(recipes);
      });
  }
}