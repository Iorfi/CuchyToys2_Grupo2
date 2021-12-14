const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router()

router.get('/carritoDeCompras', productsController.carritoDeCompras)
router.get('/categoriasDeJuguetes/:cat?', productsController.categoriasDeJuguetes)

router.get('/gestionDePago', productsController.gestionDePago)
router.get('/detalleDeProducto/:id',productsController.detalleDeProducto)
router.get('/categoriasDeJuguetesEdades', productsController.categoriasDeJuguetesEdades)

router.delete('/detalleDeProducto/:id', productsController.delete);

module.exports = router;