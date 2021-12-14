const fs= require ('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productos.json');
const { v4: uuidv4 } = require('uuid');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
const db = require ("../../database/models")
const { validationResult } = require("express-validator");

const adminController ={

        edicion: (req,res)=>{ 
            let pedidoProducto = db.Products.findByPk(req.params.id)
            let pedidoCategories = db.Products.findAll()
            let pedidoSubCategories = db.Products.findAll()

            Promise.all ([pedidoProducto, pedidoCategories, pedidoSubCategories]) 
                .then (function ([producto, category, subcategory]) {
                    return res.render("admin/formularioEdicion", {producto:producto, category:category, subcategory:subcategory})
                })
        },

        update: (req,res)=>{
            db.Products.findByPk(req.params.id)
            .then(function(prod){
                const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render ("admin/formularioEdicion", {errors: resultValidation.mapped(),oldData: req.body,producto:prod})
            }   
            })
            .then(function(){db.Products.update({

                NAME: req.body.name ,
                PRICE: req.body.price ,
                DESCRIPTION: req.body.description ,
                IMAGE: req.file.filename ,
                CATEGORY_ID: req.body.category,
                SUBCATEGORY_ID: req.body.subcategory,
                DESTACADO: req.body.destacado,
                DISCOUNT: req.body.discount,
                }, {
                    where: {
                        ID: req.params.id
                     }
                    })
                return res.redirect("/products/detalleDeProducto/" + req.params.id) 
                })
                        
 
           
        }, 
    
        // Create - Form to create
        create: (req, res) => {
            res.render('admin/formularioCarga');
                },

        // Create -  Method to store


        store: (req, res) => {
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render ("admin/formularioCarga", {errors: resultValidation.mapped(),oldData: req.body})
            }   
        db.Products.create({
            NAME: req.body.name ,
            PRICE: req.body.price ,
            DESCRIPTION: req.body.description ,
            IMAGE: req.file.filename ,
            CATEGORY_ID: req.body.category,
            SUBCATEGORY_ID: req.body.subcategory,
            DESTACADO: req.body.destacado,
            DISCOUNT: req.body.discount,
        })
        return res.redirect("/products/categoriasDeJuguetes")
    }

}
module.exports = adminController;

/*     edicion: (req,res)=>{
        let idP = req.params.id;
        res.render('admin/formularioEdicion',{products: products, id: idP})
        },
      */   

 /*    update: (req,res)=>{
            let idP = parseInt(req.params.id);
            products.forEach(product => {
                if(product.id === idP) {
                    product.name = req.body.name;
                    product.price = req.body.price;
                    product.category = req.body.category;
                    product.subcategory = req.body.subcategory;
                    product.description = req.body.descripcion;
                    product.discount = req.body.discount;
                    product.destacado = req.body.destacado;
                    
                        if (req.file) {
                            let indexProduct = products.findIndex(product => product.id === idP);
                            let imagePath = path.join(__dirname, '../../public/images/products', products[indexProduct].image);
                            fs.unlink(imagePath, function (err) {
                                if (err) throw err;
                            });
                            product.image = req.file.filename;
                            }
                    }
                })
                let productsJSON = JSON.stringify(products, null, ' ');
                fs.writeFileSync(productsFilePath, productsJSON);
		        res.redirect('/products/categoriasDeJuguetes');
            }  , */


/* store: (req, res) => {
    if (req.file) {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let newProduct = {
            id: uuidv4(),
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            destacado: req.body.destacado,
            category: req.body.category,
            subcategory: req.body.subcategory,
            description: req.body.description,
            image: req.file.filename
            
        }
        products.push(newProduct);   
        let productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);
        res.redirect('/'); 
    } else {
        res.render('admin/formularioCarga');
    }
} */
