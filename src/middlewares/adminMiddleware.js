module.exports = (req, res, next)=>{
    if(!res.locals.admin){
        return res.redirect('/')
        
    }
    next()
}
