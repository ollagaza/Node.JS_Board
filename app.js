let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
// let WebSocket = require("ws"); //WebSocket 모듈

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/userAPI');
let formRouter = require('./routes/form');
let boardRouter = require('./routes/board');
let listAPIRouter = require('./routes/listAPI');
let listAPIRouter2 = require('./routes/listAPI2');
let viewAPIRouter = require('./routes/viewAPI');
let writeAPIRouter = require('./routes/writeAPI');
let uploadAPIRouter = require('./routes/uploadAPI');

let app = express();
let cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/form', formRouter);
app.use('/list', boardRouter);
app.use('/board', boardRouter);
app.use('/api/list', listAPIRouter);
app.use('/listapi2', listAPIRouter2);
app.use('/api/view', viewAPIRouter);
app.use('/api/write', writeAPIRouter);
app.use('/api/upload', uploadAPIRouter);

//app.use('/board/list/:page', boardRouter);

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

/*var socketServer = new WebSocket.Server({port:30001});

//이벤트처리
socketServer.on("connection", function(socket){
  console.log("접속자감지!");
});*/

module.exports = app;
