/* import Categories from "./Categories"; */

module.exports = (sequelize, dataTypes) => {

    let alias = "Categories"
    let cols = {
        ID: {
            type: dataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        NAME: {
            type: dataTypes.STRING(50)
        },
        CREATED_AT: {
            type: dataTypes.DATE
        },
        MODIFIED_AT: {
            type: dataTypes.DATE
        },
        DELETED_AT: {
            type: dataTypes.DATE
        }


    }
    let config = {
        tableName: "categories",
        timestamps: false
    }


    const Categories = sequelize.define (alias, cols, config)


  
  Categories.associate = function(models) {
        Categories.hasMany(models.Products, {
            as: "categProd",
            foreignKey: "ID"
        })
    }
 
    return Categories;

}