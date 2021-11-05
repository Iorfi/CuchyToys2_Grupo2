const path = require('path');
const fs = require('fs')
const productsFile = path.join(__dirname, '../data/productos.json')
const categorysFile = path.join(__dirname, '../data/categorias.json')
const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'))
const category = JSON.parse(fs.readFileSync(categorysFile, 'utf-8'))

const productsControlador = {
    gestionDePago: (req,res)=>{res.render('products/gestionDePago')},

    carritoDeCompras: (req,res)=>{res.render('products/carritoDeCompras')},

    categoriasDeJuguetes: (req,res)=>{ 
        let porductosAMostrar =[]
        if(req.params.cat != undefined){
            
            let productosFiltrados = []
            products.forEach(prod => {
                if(prod.category.toLowerCase() == req.params.cat.toLowerCase()  ){
                    productosFiltrados.push(prod)
                }
            });
            porductosAMostrar = productosFiltrados
        }
        else{porductosAMostrar = products}
        res.render('products/categoriasDeJuguetes',{products: porductosAMostrar})

    },

    detalleDeProducto: (req,res)=> {
        let idProducto = req.params.id;
        res.render('products/detalleDeProducto', {products, id: products, idProducto})
    
    },

    categoriasDeJuguetesEdades: (req,res)=>{
        let productosPorEdades = products.filter(i => i.category === 'Juego')
        res.render('products/categoriasDeJuguetesEdades',{ edades : productosPorEdades})},

    delete: (req,res) => {
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
    }

}
    module.exports = productsControlador;