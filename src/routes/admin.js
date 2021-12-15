const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router()
const multer = require('multer');
const path = require('path');
const adminMiddleware = require("../middlewares/adminMiddleware")


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

const { body } = require("express-validator")
const validations = [
    body("name").notEmpty().withMessage("el nombre no puede estar vacio").isLength({min:5}).withMessage("el nombre debe terner al menos 5 caracteres"), 
    body("description").notEmpty().withMessage("la descripcion no puede estar vacia").isLength({min:20}).withMessage("Debe tener al menos 20 caracteres"),
    body("image").custom ((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [".jpg",".jpeg" ,".png", ".gif"]

        if (!file) {
            throw new Error("Tienes que subir una imagen");
        } else {
        let fileExtension =  path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extenciones de archivo permitidas son .jpg, .png y gif`);
        }}
        return true;
    })
]




/*** EDIT ONE PRODUCT ***/ 
router.get('/formularioEdicion/:id',adminMiddleware, adminController.edicion)
router.put('/formularioEdicion/:id',upload.single('image'),validations ,adminController.update); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/formularioCarga',adminMiddleware, adminController.create); 
router.post('/', upload.single('image'), validations,adminController.store); 

module.exports = router;