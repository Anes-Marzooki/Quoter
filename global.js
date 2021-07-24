// FIXME: import layer from 'layers/index.js'
// Initial canvas dimensions
let canvasW = 2000;
let canvasH = 2000;

let imgName;
// Create a stage
let myStage;

// Create layers
let layer1;
let layer2;

function initCanvas() {

  var myStage = new Konva.Stage({
    container: 'stage-container',
    width: canvasW,
    height: canvasH,
  });

  layer1 = new Konva.Layer();
  layer2 = new Konva.Layer();
  myStage.add(layer1);
  myStage.add(layer2);
  //  console.log('canvas initiated')
  return myStage;
}; // DONE:


function initImg(src) {
  var imageObj = new Image();
  imageObj.onload = function () {
    // creates an image shape
    var upImg = new Konva.Image({
      x: 50,
      y: 50,
      image: imageObj,
      width: 2000,
      height: 2000,
      id: 'my-image'
    });
    // add the shape to the layer
    layer1.add(upImg);
    // func add to layer( layer, arguments...);
    layer2.add(textNode);
    layer2.add(tr);
    layer1.draw();
    layer2.batchDraw();
    //    myBlur();
    //    layer.addAll()
  };
  imageObj.src = src;
};

// On input change, triggers the initImg func
window.addEventListener('load', function () {
  myStage = initCanvas();
  var imgInput = document.getElementById("input-file");
  imgInput.addEventListener("change", function (e) {
    let file = e.target.files[0];
    imgName = e.target.files[0].name;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      initImg(e.target.result);
    }
  })
});


// Donwload
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = imgName;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}
document.getElementById('download-btn').addEventListener('click', function () {
  tr.enabledAnchors = false;
  tr.borderStroke = 'red';
  // TODO: create a function to toggle the transformer on and off.
  layer2.add(tr)
  layer2.draw();
  let dataURL = myStage.toDataURL();
  console.log(tr.enabledAnchors)
  downloadURI(dataURL)
})

// testing
document.getElementById('test-btn').addEventListener('click', function () {
  let element = myStage.find('#my-image')[0];
  //  element.focus();
  //  element.hide();
  //  layer2.draw();
  console.log(element.blurRadius())
  //  element.blur();
  //  console.log(element)
})

// slider blur
function myBlur() {
  var slider = document.querySelector('#slider-blur');
  var originalImg = myStage.find('#my-image')[0];
  originalImg.cache();
  originalImg.filters([Konva.Filters.Blur]);
  slider.oninput = function () {
    originalImg.blurRadius(slider.value);
    layer1.batchDraw();
  }
}
// filter btn event
function toggleFilterMenu() {
  var menu = document.querySelectorAll('.btn');
  menu.onclick = function () {
    document.querySelector('#filters-menu').classList.toggle(hide)
  }
}
