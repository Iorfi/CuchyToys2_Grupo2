const path = require('path');
const fs = require('fs');
const db = require('../../database/models');
const mainController = {
    
    home: (req,res) => {
        let porductosAMostrar =[]
        if(req.params.of != undefined){
        db.Products.findAll({where:{DISCOUNT: 10}})
        .then(function(products){
            let porductosAMostrar = products
            return res.render('home',{products: porductosAMostrar})
        }) 

        }
        else{
            db.Products.findAll({where:{DESTACADO: 1}})
            .then(function(products){
                let porductosAMostrar = products
                return res.render('home',{products: porductosAMostrar})
            })
        }
    }
    
}
module.exports = mainController;