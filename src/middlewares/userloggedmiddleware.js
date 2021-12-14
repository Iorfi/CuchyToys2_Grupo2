module.exports = (req,res, next)=>{
res.locals.isLogged = false
if(req.session && req.session.userLogged){
    res.locals.isLogged = true
    res.locals.userLogged = req.session.userLogged
    res.locals.admin = false
if(req.session.userLogged.IS_ADMIN){
    res.locals.admin = true
}
}
next()
}