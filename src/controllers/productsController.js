const path = require('path');
const fs = require('fs');
const db = require('../../database/models');
const productsFile = path.join(__dirname, '../data/productos.json')
const categorysFile = path.join(__dirname, '../data/categorias.json')
const Op = db.Sequelize.Op

const category = JSON.parse(fs.readFileSync(categorysFile, 'utf-8'))

const productsControlador = {
    gestionDePago: (req,res)=>{res.render('products/gestionDePago')},

    carritoDeCompras: (req,res)=>{
        console.log(location.href)
        res.render('products/carritoDeCompras')},

    categoriasDeJuguetes: (req,res)=>{ 
        if(req.query.textoBuscado == undefined){
            let porductosAMostrar =[]
        if(req.params.cat != undefined){
            
           
            db.Products.findAll({where:{CATEGORY_ID: req.params.cat}})
            .then(function(products){
                let porductosAMostrar = products
                return res.render('products/categoriasDeJuguetes',{products: porductosAMostrar})
            })
            

        }
        else{
            db.Products.findAll()
            .then(function(products){
                let porductosAMostrar = products
                return res.render('products/categoriasDeJuguetes',{products: porductosAMostrar})
            })
            .catch(function(error){console.log(error)}

            )
        }
        }
        else{
            console.log(req.query.textoBuscado)
            hola = req.query.textoBuscado
            db.Products.findAll({where:{NAME: {[Op.like]: `%${hola}%`}}})
            .then(function(products){
                let porductosAMostrar = products
                return res.render('products/categoriasDeJuguetes',{products: porductosAMostrar})
            })
        }
        
        
        
    },

    detalleDeProducto: (req,res)=>{
        db.Products.findByPk(req.params.id)
            .then (function(producto) {
                console.log(producto)
            res.render ("products/detalleDeProducto", {products:producto,admin:res.locals.admin}) 
            })
    },

    categoriasDeJuguetesEdades: (req,res)=>{
        let productosPorEdades = products.filter(i => i.category === 'Juego')
        res.render('products/categoriasDeJuguetesEdades',{ edades : productosPorEdades})},


    delete: (req,res) => {
        db.Products.destroy ({
            where: {
                id: req.params.id
            }
        })

        return res.redirect("/products/categoriasDeJuguetes")
    }

}
    module.exports = productsControlador;

      /*   detalleDeProducto: (req,res)=> {
        let idProducto = req.params.id;
        res.render('products/detalleDeProducto', {products, id: products, idProducto})
    }, */

    /*     delete: (req,res) => {
        let idProduct = parseInt (req.params.id)
        let indexProduct = products.findIndex(product => product.id === idProduct);
		let imagePath = path.join(__dirname, '../../public/images/products', products[indexProduct].image);
        fs.unlink(imagePath, function (err) {
			if (err) throw err;
			console.log('File deleted!');});
        let productsUpdated = products.filter(i => i.id !== idProduct);
		let productsUpdatedJSON = JSON.stringify(productsUpdated);
		fs.writeFileSync(productsFile, productsUpdatedJSON);
		res.redirect('/');
    } */

