module.exports = (sequelize, dataTypes) => {

    let alias = "SubCategories"
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
        tableName: "subcategories",
        timestamps: false
    }


    const Users = sequelize.define (alias, cols, config)

/* REVISAR CODIGO

Categories.associate = function(models) {
        Categories.HasMany (models.Products, {
            as: "categProd",
            foreignKey: "ID"
        })
    } */

    return Users;

}