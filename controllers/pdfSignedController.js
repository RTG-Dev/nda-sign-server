
const fs = require('fs');
//const PDFDocument = require('pdfkit');



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

  async savePdfAngularProject(){
    console.log('pdfSigned==>PdfSignedController, req.file',req.file )
  }

  async savePdf(req, res){
  
    console.log('pdfSigned==>PdfSignedController, req.body',req.body )
    const dataURL = req.body.mydata;
    const matches = dataURL.match(/^data:image\/(\w+);base64,(.*)$/);
    
    if (!matches) {
      return res.status(400).send('Invalid data URL');
    }
    
    const ext = matches[1].toLowerCase();
    const base64Data = matches[2];
    
    if (ext !== 'png') {
      return res.status(400).send('Only PNG images are supported');
    }

    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Add a blank page to the document
    const page = pdfDoc.addPage();

    // Load the image
    const img = await pdfDoc.embedPng(base64Data);

    // Get the image dimensions and scale them by 50%
    const scaleFactor = 0.75;

    // Get the image dimensions
    const { width, height } = img.scale(scaleFactor);

    // Add image to the PDF
    page.drawImage(img, { x: 0, y: 0, width, height });

    // Save the PDF to a file
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('outputGPT4.pdf', pdfBytes);

    console.log('File written successfully');
    res.send('File written successfully');
  } catch (error) {
    console.error('Failed to create PDF:', error);
    res.status(500).send('Failed to create PDF');
  }
  

  // old one
  async savePdf2(req, res){
    // console.log('req.body',req.body)
    // const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const fs = require("fs");
    
    const b = req.body
    console.log("Hello !");
    
    //  const myFile = new File([b], 'image.jpeg', {
      //     type: b.type,
      // });
      
      // console.log("The  blob index :",b.mydata.indexOf("base64") + 7);
      //console.log("The file blob !! :",b.mydata.substring(b.mydata.indexOf("base64") + 7));
      // const theBlob = b.mydata.substring(b.mydata.indexOf("base64") + 7)
      //const theBlob = b.mydata.substring(b.mydata.indexOf("base64") + 23)

      //*************from GPT4********************** */
      const theBlob = b.mydata.split(',')[1];
      if (!theBlob) {
        console.error("Could not extract base64 string from data URI");
        process.exit(1);
      }
      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.create();
      // Add a blank page to the document
      const page = pdfDoc.addPage();
      // Load the image
      const img = await pdfDoc.embedJpg(theBlob);
      // Get the image dimensions
      const { width, height } = img.scale(1);
      // Add image to the PDF
      page.drawImage(img, { x: 0, y: 0, width, height });
      // Save the PDF to a file
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync('outputGPT4.pdf', pdfBytes);
      console.log('File written successfully');
      res.send('File written successfully');

      // const buffer = Buffer.from(theBlob, "base64");
      // const doc = new PDFDocument;
      // // Setup your PDF size, margins, etc. here
      // const pdfWidth = 595.28; // Example width for A4 size
      // const pdfHeight = 841.89; // Example height for A4 size
      // doc.addPage({ size: [pdfWidth, pdfHeight] });
      // doc.image(buffer, 0, 0, { width: pdfWidth, height: pdfHeight });
      //       // Prepare for file saving
      // const filePath = 'outputGPT4.pdf';
      // const writeStream = fs.createWriteStream(filePath);
      // // Save PDF to file
      // doc.pipe(writeStream);

      // Handle file saving completion
      // writeStream.on('finish', () => {
      //   console.log('File written successfully');
      // });


      // fs.writeFile("outputGPT4.pdf", buffer, (err) => {
      //   if (err) {
      //     console.error("Failed to write file:", err);
      //   } else {
      //     console.log("File written successfully");
      //   }
      // });
      /******************************************* */
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
   //  res.send('ok')
  }


  //  blobToFile(theBlob, fileName){
  //   //A Blob() is almost a File() - it's just missing the two properties below which we will add
  //   theBlob.lastModifiedDate = new Date();
  //   theBlob.name = fileName;
  //   return theBlob;
  // }


}
module.exports = new PdfSignedController();






