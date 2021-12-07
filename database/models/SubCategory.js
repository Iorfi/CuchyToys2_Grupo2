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


    const SubCategories = sequelize.define (alias, cols, config)

SubCategories.associate = function(models) {
        SubCategories.hasMany (models.Products, {
            as: "categProd",
            foreignKey: "ID"
        })
    } 

    return SubCategories;

}