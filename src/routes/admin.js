const express = require('express');
const router = express.Router()
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/products'));
    } ,

    filename: function(req, file, cb) {
        const newFileName = 'product-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload = multer({ storage });

const adminController = require('../controllers/adminController');


/*** EDIT ONE PRODUCT ***/ 
router.get('/formularioEdicion/:id', adminController.edicion)
router.put('/formularioEdicion/:id',upload.single('product-image'), adminController.update); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/formularioCarga', adminController.create); 
router.post('/', upload.single('product-image'), adminController.store); 

module.exports = router;