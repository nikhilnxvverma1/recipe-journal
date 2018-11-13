module.exports = (sequelize, DataTypes) => {

    const Ingredient = sequelize.define('Ingredient', {
        name:DataTypes.STRING
    }, {
        timestamps: false,

        tableName: 'ingredient', 
        
        classMethods: {
            associate: (models) => {
                Ingredient.hasMany(models.Recipe);
            }
        }
    })

    return Ingredient;
}