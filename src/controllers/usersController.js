const path = require('path');
const fs = require('fs')
const usersFile = path.join(__dirname, '../data/usuarios.json')
const { validationResult } = require("express-validator");
const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'))
const bcryptjs =require("bcryptjs")

// const User = require("../models/User")
const db = require("../../database/models") 


const usersController ={

    comoComprar: (req,res)=>{res.render('users/comoComprar')},

    registro: (req,res)=>{res.render('users/registro')},

    registerProcess: (req, res) => {
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
    },

    
    login: (req,res)=>{res.render('users/login')},

    loginProcess: (req, res) => {
        const resultValidation = validationResult(req);
        let userToLogin = User.findByField("email", req.body.email);
        if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if(isOkThePassword){
                delete userToLogin.password 
                delete userToLogin.password2
                req.session.userLogged =userToLogin
                return res.redirect('/users/perfil')
            }

            return res.render("users/login", {
                errors: {email: {msg: "Las credenciales so invalidas"}}
            })

        }
 
        return res.render("users/Login", {
            errors: {email: {msg: "No se encuentra este email en nuestra base de datos"}},
            oldData: req.body
        })
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