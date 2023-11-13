
const fs = require('fs');
// const saveAs = require('file-saver');
// import { Blob } from 'buffer';
const  { Blob } = require('buffer');
// const jsPDF = require('jspdf');

//  const jsPDF = require('jspdf/dist/jspdf.node.min.js')
//  var jsPDF = require("node-jspdf");
const { PDFDocument } = require('pdf-lib');
// Create a new PDFDocument


class PdfSignedController {
  constructor() {
    this.fs = fs
  }
  
  async savePdf(req, res){
    // console.log('req.body',req.body)
    // const imgData = canvas.toDataURL("image/jpeg", 1.0);
    
    const b = req.body
    console.log("Hello !");
    
    //  const myFile = new File([b], 'image.jpeg', {
      //     type: b.type,
      // });
      
      // console.log("The  blob index :",b.mydata.indexOf("base64") + 7);
      //console.log("The file blob !! :",b.mydata.substring(b.mydata.indexOf("base64") + 7));
      const theBlob = b.mydata.substring(b.mydata.indexOf("base64") + 7)
      
      const fs = require("fs");
      const invoice = { fileData: theBlob };
      
      const invoiceFileContents = new Buffer.from(invoice.fileData, "base64");
      fs.writeFileSync( "yesitwork.pdf", invoiceFileContents);


      
      // var myFile2 = this.blobToFile(theBlob, "my-image.png");
      
      this.fs.writeFileSync("./mytest.pdf",'abc', { encoding: 'utf8' }, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      }); 
      
      // const pdf = new jsPDF()
      // pdf.text("Hello", 10, 10);
      // pdf.addImage(theBlob, 'JPEG', 0, 0);
    // pdf.save("download.pdf");
    // var data = pdf.output();

    // fs.writeFileSync('./document.pdf', data, 'binary');

    //var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    //  saveAs(b, "hello-world.pdf");
    

    this.fs.writeFileSync('myfile.pdf',  b.mydata, { encoding: 'base64' }, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("new file saved");
    }); 
    // const pdfDoc2 = await PDFDocument.load( b.mydata)
    // const pdfBytes = await pdfDoc2.save()

    // var doc = new jsPDF();
    // doc.text("Hello", 10, 10);
    // var data = doc.output();
    // fs.writeFileSync('./document2.pdf', data, 'binary');


        // var file = {{someUrl}};
        // const fileName = 'HTML_Basics.pdf';
        // var blob = new Blob([b], {type: "application/pdf"});
        // saveAs.saveAs(blob,fileName);








    //  const pdf = new jsPDF();
    //  pdf.addImage(imgData, 'JPEG', 0, 0);
    //  pdf.save("mydownload.pdf");
     res.send('ok')
  }


  //  blobToFile(theBlob, fileName){
  //   //A Blob() is almost a File() - it's just missing the two properties below which we will add
  //   theBlob.lastModifiedDate = new Date();
  //   theBlob.name = fileName;
  //   return theBlob;
  // }


}
module.exports = new PdfSignedController();






