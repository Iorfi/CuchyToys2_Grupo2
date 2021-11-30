module.exports = (sequelize, dataTypes) => {

    let alias = "Products"
    let cols = {
        ID: {
            type: dataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        USERNAME: {
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
        tableName: "product",
        timestamps: false
    }


    const Users = sequelize.define (alias, cols, config)

    return Users;

}