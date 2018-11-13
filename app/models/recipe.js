module.exports = (sequelize, DataTypes) => {

    const Recipe = sequelize.define('Recipe', {

        title:DataTypes.STRING,
        teaserText:DataTypes.STRING,
        instructions:DataTypes.STRING,
        cookingTime:DataTypes.INTEGER,
        previewUrl:DataTypes.STRING,
        favourite:DataTypes.BOOLEAN,
        preparationTime:DataTypes.INTEGER,
        postDate:DataTypes.DATE,
        course:DataTypes.STRING,
        vegetarian:DataTypes.BOOLEAN
    }, {

        timestamps: false,

        tableName: 'recipe', 
        
        classMethods: {
            associate: (models) => {
                Recipe.hasMany(models.Ingredient);
              }
        }
    });

    return Recipe;
};