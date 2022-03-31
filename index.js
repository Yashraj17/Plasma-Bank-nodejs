const dotenv = require('dotenv');
dotenv.config()
var express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('express-flash');
const ConnectDB = require('./DataBase/connectdb')
const router = require('./Route/web')
var app = express();

const DATABASE_URL = process.env.URL
ConnectDB(DATABASE_URL)

app.use(bodyParser.urlencoded({extended:false}));

app.use(flash());
app.use(session({
    secret:"yashrajismyname",
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}
}))

app.set('view engine','ejs')
app.set('views','./Views')

app.use('/',router)

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`serving running at port ${port}`);
})