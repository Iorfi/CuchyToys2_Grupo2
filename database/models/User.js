module.exports = (sequelize, dataTypes) => {

    let alias = "Users"
    let cols = {
        ID: {
            type: dataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        NAME: {
            type: dataTypes.STRING(50)
        },
        USERNAME: {
            type: dataTypes.STRING(50)
        },
        EMAIL: {
            type: dataTypes.STRING(70)
        },
        PASSWORD: {
            type: dataTypes.STRING(50)
        },
       
        AVATAR: {
            type: dataTypes.STRING(50)
        },
        IS_ADMIN: {
            type: dataTypes.BOOLEAN
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
        tableName: "users",
        timestamps: false
    }


    const Users = sequelize.define (alias, cols, config)

Users.associate = function(models) {
        Users.hasMany (models.UserProducts, {
            as: "usersProd",
            foreignKey: "ID"
        })
    } 

    return Users;

}
