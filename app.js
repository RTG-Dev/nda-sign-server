const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
require("dotenv").config();
const fs = require('fs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ndaToSignRoute = require("./routes/ndaToSign");
const pdfSignedRoute = require("./routes/pdfSigned");

const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
// app.use(express.bodyParser({limit: '50mb'}))

app.use(
  cors({
    credentials: true,
    origin:  '*'
  })
  );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ndaToSign', ndaToSignRoute);
app.use('/pdfSigned', pdfSignedRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


const today = new Date();
today.setDate(today.getDate(today.getDate()))

 // change the  javascript date format to SQL date format
function  formatDate(date) {
   return [
     date.getFullYear(),
     padTo2Digits(date.getMonth() + 1),
     padTo2Digits(date.getDate()),
   ].join("-");
 }
function padTo2Digits(num) {
   return num.toString().padStart(2, "0");
 }

const myDate =  today.toLocaleDateString("he-IS", {
 year: "numeric",
 month: "2-digit",
 day: "2-digit",
})
console.log('today :', myDate)


/******************************************* */
 // const  fetch = require('node-fetch');
 const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
 const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));




(async function modifyPdf() {
  const url = 'http://localhost:3044/docs/internship-NDA.pdf'
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

 const pdfDoc = await PDFDocument.load(existingPdfBytes)
 const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

 const pages = pdfDoc.getPages()
 const firstPage = pages[0]
 const { width, height } = firstPage.getSize()
 firstPage.drawText('omer', {
   x: 140,
   y: height / 2 + 206,
   size: 12,
   font: helveticaFont,
   color: rgb(0.1, 0.1, 0.1),
 //  rotate: degrees(-45),
 })
 firstPage.drawText('1233455679', {
   x: 294,
   y: height / 2 + 206,
   size: 10,
   font: helveticaFont,
   color: rgb(0.1, 0.1, 0.1),
 //  rotate: degrees(-45),
 })
 firstPage.drawText('Dizingof 42   Tel Aviv', {
   x: 140,
   y: height / 2 + 182,
   size: 10,
   font: helveticaFont,
   color: rgb(0.1, 0.1, 0.1),
 //  rotate: degrees(-45),
 })

 const lastPage = pages[4]
 lastPage.drawText('baba j', {
   x: 180,
   y: height / 2 + 37,
   size: 10,
   font: helveticaFont,
   color: rgb(0.1, 0.1, 0.1),
 //  rotate: degrees(-45),
 })
 lastPage.drawText(myDate, {
   x: 385,
   y: height / 2 + 75,
   size: 10,
   font: helveticaFont,
   color: rgb(0.1, 0.1, 0.1),
 //  rotate: degrees(-45),
 })




fs.writeFileSync("./docs/internship-NDA.pdf", await pdfDoc.save());

//   fs.writeFile("./destination2.html", pdfBytes, function(err) {
//                 if(err) {
//                     return console.log(err);
//                 }else{
//                   console.log("The file was saved!");
//                 }
//     });
// })
})()



/******************************************* */

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
