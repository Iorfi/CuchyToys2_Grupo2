const express = require ('express');
const app = express();
const path = require("path");
const port= 3030;
const productsRouter = require('./src/routes/products')
const usersRouter = require('./src/routes/users')
const homeRouter = require('./src/routes/home')
const adminRouter = require('./src/routes/admin')
const methodOverride =  require('method-override');
const session = require('express-session')
const userlogged = require('./src/middlewares/userloggedmiddleware')


const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()) 


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret:"nuestro mensaje secreto",resave:false,saveUninitialized:false}))
app.use(userlogged)

app.use('/products', productsRouter)
app.use('/', homeRouter)
app.use('/users', usersRouter )
app.use('/admin', adminRouter )

app.use((req,res,next)=>{res.status(404).render("not-found")})




app.listen(process.env.PORT || port,  function(){
    console.log(`Example app listening at http://localhost:${port}`)
});