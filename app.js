var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var indexRouter = require('./routes/index');

// API
var productAPIRouter = require('./routes/api/ProductAPI')
var userAPIRouter = require('./routes/api/UserAPI')
var categoryAPIRouter = require('./routes/api/CategoryAPI')
var cartAPIRouter = require('./routes/api/CartAPI')
var myProductAPIRouter = require('./routes/api/MyProductAPI')


// CPANEL
var productCpanelRouter = require('./routes/cpanel/ProductCpanel')
var userCpanelRouter = require('./routes/cpanel/UserCpanel')
var categoryCpanelRouter = require('./routes/cpanel/CategoryCpanel')


var app = express();


// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//MongoDB
mongoose.connect('mongodb+srv://haizzj123:123@cluster0.oharp8n.mongodb.net/FoodShop?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

 

// Link
// http://localhost:3000/
app.use('/', indexRouter);

// API 
// http://localhost:3000/product/api
app.use('/product/api', productAPIRouter)

// http://localhost:3000/user/api
app.use('/user/api', userAPIRouter)

// http://localhost:3000/category/api
app.use('/category/api', categoryAPIRouter)

// http://localhost:3000/cart/api
app.use('/cart/api', cartAPIRouter)

// http://localhost:3000/myProduct/api
app.use('/myProduct/api', myProductAPIRouter)


// CPANEL
// http://localhost:3000/product/cpanel
app.use('/product/cpanel', productCpanelRouter)

// http://localhost:3000/user/cpanel
app.use('/user/cpanel', userCpanelRouter)

// http://localhost:3000/category/cpanel
app.use('/category/cpanel', categoryCpanelRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
