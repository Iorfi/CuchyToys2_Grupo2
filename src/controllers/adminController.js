const fs= require ('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productos.json');
const { v4: uuidv4 } = require('uuid');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
const db = require ("../../database/models")

const adminController ={

    edicion: (req,res)=>{
        let idP = req.params.id;
        res.render('admin/formularioEdicion',{products: products, id: idP})
        },
        
        update: (req,res)=>{
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
            }  ,
    
// Create - Form to create
create: (req, res) => {
    res.render('admin/formularioCarga');
},

// Create -  Method to store


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

generateId: function () {
    let allUsers = this.findAll(); 
    let lastUser = allUsers.pop();
    if (lastUser) {
     return lastUser.id + 1;
    }
    return 1;
},

    store: (req, res) => {
    db.Products.create({

       //  username:  ,
        price: req.body.price ,
        description: req.body.description ,
        image: req.body.product-image ,
        category_id: req.body.category,
        subcategory_id: req.body.subcategory,
        destacado: req.body.destacado,
        discount: req.body.discount,
    })
}

}
module.exports = adminController;