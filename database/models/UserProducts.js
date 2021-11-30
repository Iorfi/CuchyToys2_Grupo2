module.exports = (sequelize, dataTypes) => {

    let alias = "UserProducts"
    let cols = {
        ID: {
            type: dataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        USER_ID: {
            type: dataTypes.INTEGER,

        },
        PRODUCT_ID: {
            type: dataTypes.INTEGER
        }


    }
    let config = {
        tableName: "userProducts",
        timestamps: false
    }

    const UsersProducts = sequelize.define (alias, cols, config)

    UserProducts.associate = function(models) {
        UserProducts.BelongsTo (models.User, {
            as: "usersProd",
            through: "userproduct",
            foreignKey: "USER_ID"
        })
    }
    UserProducts.associate = function(models) {
        UserProducts.BelongsTo (models.Products, {
            as: "usersProd",
            through: "userproduct",
            foreignKey: "PRODUCT_ID"
        })
    }

    return Users;

}