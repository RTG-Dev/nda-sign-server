
//require("dotenv").config();
``
//********************** Globals ********************************/ 

// If absolute URL from the remote server is provided, configure the CORS
// header on that server.

 //var url = `http://${process.env.serverURL}:${process.env.PORT}/pdfjs/internship-nda.pdf`;
//  var url = 'http://rt-dev.xyz:3044/pdfjs/internship-nda.pdf';
 var url = `http://${urlPort}/pdfjs/internship-nda.pdf`;

 console.log('url===>',url)
// If absolute URL from the remote server is provided, configure the CORS
// header on that server.

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];
//var { pdfjsLib } = globalThis;

// The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc =  `http://${urlPort}/pdfjs/pdf.worker.js`;

//https://github.com/mozilla/pdf.js/blob/master/src/pdf.js

var gPageSaved = {
  page1: false,
  page2: false,
  page3: false,
  page4: false,
  page5: false
}


var pdfDoc = null,
pageNum = 1,
pageRendering = false,
pageNumPending = null,
scale = 1.3,
canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// ctx.fillText("xx", 100, 50);
ctx.font = "30px Arial";



async function pageLoad(){
document.getElementById('next').addEventListener('click', onNextPage);
/**
 * Asynchronously downloads PDF.
 */
pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  document.getElementById('page_count').textContent = pdfDoc.numPages;

  // Initial/first page rendering
  renderPage(pageNum);
});
}

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
    // const myviewport = {
    //   height: 10000,
    //   width: viewport.width
    // }
    viewport = page.getViewport({scale: scale});
    //viewport.height = 1000
    
    canvas.height =  viewport.height;            //<============ control the height
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update page counters
  document.getElementById('page_num').textContent = num;
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);

/**
 * Displays next page.
 */
function onNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}

function reload(){
  pageLoad()
}



/****************** painter ******************************** */

// var canvas = document.getElementById('the-canvas'),
// g = canvas.getContext("2d");
ctx.strokeStyle = "hsl(208, 100%, 43%)";
ctx.lineJoin = "round";
ctx.lineWidth = 1;
//ctx.lineHeight = 1000;
ctx.filter = "blur(10px)";


const
relPos = pt => [pt.pageX - canvas.offsetLeft, pt.pageY - canvas.offsetTop],
drawStart = pt => { with(ctx) { beginPath(); moveTo.apply(ctx, pt); stroke(); }},
drawMove = pt => { with(ctx) { lineTo.apply(ctx, pt); stroke(); }},

pointerDown = e => drawStart(relPos(e.touches ? e.touches[0] : e)),
pointerMove = e => drawMove(relPos(e.touches ? e.touches[0] : e)),

draw = (method, move, stop) => e => {
  if(method=="add") pointerDown(e);
  canvas[method+"EventListener"](move, pointerMove);
  canvas[method+"EventListener"](stop, ctx.closePath);
};

canvas.addEventListener("mousedown", draw("add","mousemove","mouseup"));
canvas.addEventListener("touchstart", draw("add","touchmove","touchend"));
canvas.addEventListener("mouseup", draw("remove","mousemove","mouseup"));
canvas.addEventListener("touchend", draw("remove","touchmove","touchend"));


/********************** download to pdf *************************** */
const download = document.getElementById('download');
download.addEventListener("click", function() {
  // only jpeg is supported by jsPDF
  const imgData = canvas.toDataURL("image/jpeg", 1.0);
  console.log('imgData',imgData)
  const pdf = new jsPDF();
  pdf.addImage(imgData, 'JPEG', 0, 0);
  pdf.save("download.pdf");
}, false);



/********************* save page in localStorage by next button*********************** */
  const mysave = document.getElementById('next');
  mysave.addEventListener("click", function(e) {
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    localStorage.setItem(`data${pageNum}`, imgData);
    gPageSaved[`page${pageNum}`] = true
    console.log('gPageSaved',gPageSaved)
  })

/********************** send PDF with post to server  *************************** */
const mydone = document.getElementById('done');
mydone.addEventListener("click", function(e) {
  

  /****************** first save to localstorage the page 5***********************/
  const imgData = canvas.toDataURL("image/jpeg", 1.0);
  localStorage.setItem(`data${pageNum}`, imgData);
  gPageSaved[`page${pageNum}`] = true
  console.log('gPageSaved',gPageSaved)
  /****************************************************************************** */

//get the data from localstorag:

var pageData = []
for(let i =0; i<5; i++){
  var pagedataNum = localStorage.getItem(`data${i+1}`);
  pageData.push(pagedataNum)
}

console.log('pageDataAll',pageData)


  // only jpeg is supported by jsPDF
  // const imgData = canvas.toDataURL("image/jpeg", 1.0);
  // const pdf = new jsPDF();
  // pdf.addImage(imgData, 'JPEG', 0, 0);
  // pdf.save("download.pdf");


 

  


  // (async () => {
  //   const blob = new Blob(['hello']);
    
  //   var fileReader = new FileReader();
  // fileReader.onload = (event) => {
  //     this.externalScopeVariable = event.target.result;
  // };
  // fileReader.readAsArrayBuffer(blob);
  //   const buf = await blob.arrayBuffer();
  //   console.log( buf.byteLength ); // 5
  // })();

 // console.log('tttttttttttttttt',t)

  // const data = { mydata: "./download.pdf" };
  // fetch('http://rt-dev.xyz:3044/pdfSigned', {
  //   method: 'POST', // or 'PUT'
  //   body: JSON.stringify(data),
  // })
}, false);


/***************** read the PDF file and convert it to arrayBuffer***************************** */
function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  console.log('xxxxxxxxxxxxxx')
  var reader = new FileReader();
  reader.onload = function(e) {
    const contents = e.target.result;
    console.log(' type contents', contents);
   
    // displayContents(contents);
  };
  console.log('yyyyyyyyyyyyyyyyyyyy')

 // reader.readAsText(file);
  reader.readAsArrayBuffer(file);

}
// function displayContents(contents) {
//   var element = document.getElementById('file-content');
//   element.textContent = contents;
// }
document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);

/************************************************************ */

/*************************** read the canvas and convert it to blob - problem solved on post-  Paylod was too large ******************************************* */
const mytest = document.getElementById('test');
mytest.addEventListener("click", function(e) {
  canvas.toBlob(function (blob) {
    var reader = new FileReader();
    reader.onload = function () {
      //console.log(reader.result);
        const data = { mydata: reader.result };
        fetch(`http://${urlPort}/pdfSigned`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },  
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data),
        })
    }
    reader.readAsBinaryString(blob);
  });
})
/*************************************************************************** */

/************************************* canvas to dataURL ************************** */
const mytest2 = document.getElementById('test');
mytest2.addEventListener("click", function(e) {
  var dataURL = canvas.toDataURL();
        const data = { mydata: dataURL };
        fetch(`http://${urlPort}/pdfSigned`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },  
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data),
        })

  });
