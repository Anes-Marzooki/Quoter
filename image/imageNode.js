import imgLayer from '../layers/imageLayer.js';

var imageShape = {};
const imageConfig = {
  x: 50,
  y: 50,
  image: null,
  width: 200,
  height: 600,
  id: 'my-image'
};

function init(src, callback) {
  var imageObj = new Image();
  imageObj.onload = function () {
    // creates an image shape
    imageShape.el = new Konva.Image({
      ...imageConfig,
      image: imageObj
    });
    // add the shape to the layer
    imgLayer.el.add(imageShape.el);
    imgLayer.el.draw();
    callback();
  };
  imageObj.src = src;
}
imageShape.init = init;
export default imageShape;

//export default {
//  el: null,
//  init: function init(src, callback) {
//    var imageObj = new Image();
//
//    imageObj.onload = () => {
//      // creates an image shape
//      this.el = new Konva.Image({
//        ...imageConfig,
//        image: imageObj
//      });
//      // add the shape to the layer
//      imgLayer.el.add(this.el);
//      imgLayer.el.draw();
//      console.log('image Node THIS', this)
//      callback();
//    };
//    imageObj.src = src;
//  }
//}

//export default {
//  el: imageShape,
//  init: init,
//}
