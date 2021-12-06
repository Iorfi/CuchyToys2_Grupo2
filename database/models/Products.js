/* import Categories from "./Categories"; */

module.exports = (sequelize, dataTypes) => {

    let alias = "Products"
    let cols = {
        ID: {
            type: dataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        NAME: {
            type: dataTypes.STRING(50)
        }, 
        PRICE: {
            type: dataTypes.TEXT
        },
        DESCRIPTION: {
            type: dataTypes.TEXT
        },
        IMAGE: {
            type: dataTypes.TEXT
        },
        CATEGORY_ID: {
            type: dataTypes.INTEGER
        },
        DESTACADO: {
            type: dataTypes.BOOLEAN
        },
        DISCOUNT: {
            type: dataTypes.INTEGER
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
        tableName: "products",
        timestamps: false
    }


    const Products = sequelize.define (alias, cols, config)

    

   
/*  Products.associate = function(models) {
        Products.HasMany (models.UserProducts, {
            as: "product_id",
            foreignKey: "ID"
        })
    }   */

    Products.associate = function(models) {
        Products.belongsTo(models.Categories, {
            as: "categories",
            foreignKey: "CATEGORY_ID"
        })
    }





    return Products;


    
}