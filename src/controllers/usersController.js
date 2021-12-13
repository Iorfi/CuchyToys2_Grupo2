const path = require('path');
const fs = require('fs')
const usersFile = path.join(__dirname, '../data/usuarios.json')
const { validationResult } = require("express-validator");
const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'))
const bcryptjs =require("bcryptjs")
const db = require ("../../database/models")

const User = require("../models/User")


const usersController ={

    comoComprar: (req,res)=>{res.render('users/comoComprar')},

    registro: (req,res)=>{res.render('users/registro')},

    registerProcess: (req,res)=>{ 
        db.Users.findOne(
            {
                where:
                {
                    email:req.body.email
                }
            })
        .then(function(usuario){ 
            if (usuario==null){
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render ("users/registro", {errors: resultValidation.mapped(),oldData: req.body})
            } 
               else {
                   
                db.Users.create ({   
                        NAME:     req.body.first_name,
                        USERNAME: req.body.user_name,
                        EMAIL:    req.body.email,
                        PASSWORD: bcryptjs.hashSync(req.body.password, 10),
                        AVATAR:   req.file.filename,
                    })
                return res.redirect ("/users/login")
            }
            }
        else{
            return res.render ("users/registro", {
                errors: {email:  {msg: 'Este mail ya esta registrado'}},
                oldData: req.body
           });
         }
        }

        // FALTA CHEQUEAR SI EL MAIL Y EL NOMBRE DE USUARIO INGRESADOS YA EXISTEN
        )},
    
    /* {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
             return res.render ("users/registro", {
                 errors: resultValidation.mapped(),
                 oldData: req.body
            });
         }

         let userInDB = User.findByField("email", req.body.email)

         if(userInDB){
            return res.render ("users/registro", {
                errors: {email:  {msg: 'Este mail ya esta registrado'}},
                oldData: req.body
           });
         }

         let userToCreate = {
             ...req.body, 
             password: bcryptjs.hashSync(req.body.password, 10),
             avatar: req.file.filename
         }
        let userCreate = User.create(userToCreate);
        return res.redirect('/users/login')
    }, */

    
    login: (req,res)=>{res.render('users/login')},

      
          
        // HAY QUE RECUPERAR LA INFO DE LOS CAMPOS DE LAS COLUMNAS DE LA BASE DE DATOS Y COMPARARLAS CON LOS INGRESADOS (no esta hecho)

    loginProcess: (req, res) => {

        db.Users.findOne({where:{email:req.body.email}
        })
        .then(function(usuario){ if (usuario!=null){
            console.log(req.body.password)
            console.log(usuario.PASSWORD)
                 let isOkThePassword = bcryptjs.compareSync(req.body.password, usuario.PASSWORD)   
                if(isOkThePassword){
                    req.session.userLogged =usuario
                    return res.redirect('/users/perfil')
                }
    
                return res.render("users/login", {
                    errors: {email: {msg: "Las credenciales es invalidas"}}
                })
    
            }
     
            return res.render("users/Login", {
                errors: {email: {msg: "No se encuentra este email en nuestra base de datos"}},
                oldData: req.body
            })
            
        }

        )


        
     },
 
 
     logout:(req, res)=>{
         req.session.destroy()
         return res.redirect('/')},
    
    preguntasFrecuentes: (req,res)=>{res.render('users/preguntasFrecuentes')}, 
    perfil: (req,res)=>{
        res.render('users/perfil', {user: req.session.userLogged} )
    }
}
module.exports = usersController;