const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router()


//MULTER
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/users");
    },
    filename: (req, file, cb) => {
        const newFileName = 'users-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const uploadFile = multer ({ storage });

// Middlewares
const GuestMiddleware = require('../middlewares/GuestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
// const uploadFile = require('../middlewares/multermiddleware')
// const validations = require('../middlewares/validateRestisterMiddleware')

//Express Validator
const { body } = require ("express-validator")

const validationsRegistro = [    
    body("first_name").notEmpty() .withMessage("Tienes que escribir un nombre").isLength({min:2}), 
    // body("last_name").notEmpty().withMessage("Tienes que escribir un apellido"),
    body("email").notEmpty() .withMessage("Tienes que escribir un email").bail().isEmail().withMessage("Debes escribir un formato de correo electrónico válido"), 
    // body("telefono").notEmpty() .withMessage("Tienes que escribir un teléfono"), 
    body("password").notEmpty() .withMessage("Tienes que escribir una contraseña con minimo 8 caracteres").isLength({min:8}), 
    body("password2").custom ((value, { req }) => {
        if (req.body.password !== req.body.password2) {
            throw new Error("La contraseña no coincide con la primera ingresada");
        }
        return true;
    }),
    body("avatar").custom ((value, { req }) => {
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

const validationsLogin = [
    body("email").notEmpty() .withMessage("Tienes que escribir un email").bail().isEmail().withMessage("Debes escribir un formato de correo electrónico válido"), 
    // body("telefono").notEmpty() .withMessage("Tienes que escribir un teléfono"), 
    body("password").notEmpty().withMessage("Tienes que escribir una contraseña"),
]



//formulario de registro
router.get('/registro', GuestMiddleware,usersController.registro)
//formulario de login
router.get('/login', GuestMiddleware,usersController.login)

router.get('/perfil',authMiddleware,usersController.perfil)

router.get('/editUser',usersController.editUser)
router.put('/editUser',uploadFile.single("avatar"), validationsRegistro,usersController.editProcess)



// router.get('/profile',authMiddleware,usersController.profile)

router.get('/logout',usersController.logout)
//pagina como comprar
router.get('/comoComprar', usersController.comoComprar)
//pagina preguntas frecuentes
router.get('/preguntasFrecuentes', usersController.preguntasFrecuentes)

//router.get('/profile/:userId',authMiddleware,usersController.profile)
 

// proceso de login
router.post('/login', validationsLogin,usersController.loginProcess)
//procesar registro
router.post('/registro',uploadFile.single("avatar"), validationsRegistro ,usersController.registerProcess)

module.exports = router;