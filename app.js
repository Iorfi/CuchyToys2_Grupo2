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


const { Sequelize } = require('sequelize');
const config = require("./database/config/config")
console.log(process.env.NODE_ENV)

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


/* SEGUN DIEGO */
const sequelize = new Sequelize(config[process.env.NODE_ENV].database, config[process.env.NODE_ENV].username, config[process.env.NODE_ENV].password, {
    host: config[process.env.NODE_ENV].host,
    dialect: config[process.env.NODE_ENV].dialect
  });

  async function test() {
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}
test()


app.listen(process.env.PORT || port,  function(){
    console.log(`Example app listening at http://localhost:${port}`)
});