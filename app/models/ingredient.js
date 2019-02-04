module.exports = (sequelize, DataTypes) => {

    const Ingredient = sequelize.define('Ingredient', {
        name:DataTypes.STRING
    }, {
        classMethods: {
            associate: (models) => {
                Ingredient.hasMany(models.Recipe);
            }
        }
    })

    return Ingredient;
}