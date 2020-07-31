import myStage from '../stage/index.js';
import textLayer from '../layers/textLayer.js';
import transformer from './textTransformer.js';
import image from '../image/imageNode.js';
import imgLayer from '../layers/imageLayer.js';

let textNode = {};
var textarea;
let originalBlur;

let textConfig = {
  text: 'Place Holder',
  x: 75,
  y: 80,
  fontSize: 20,
  fill: 'white',
  shadowColor: 'black',
  shadowOffset: {
    x: 1,
    y: 2
  },
  shadowOpacity: 0.5,
  draggable: true,
  width: 150
};

function init() {
  // create node
  textNode.el = new Konva.Text(textConfig);
  //  console.log(textNode);
  // add to layer
  textLayer.el.add(textNode.el)
  // draw layer
  textLayer.el.draw();
  transformer.init(textNode.el);
  textNode.el.on('transform', handleTransform);

  textNode.el.on('dblclick', () => {
    // hide text node and transformer:
    textNode.el.hide();
    console.log('double clicked', transformer.el);
    transformer.el.hide();
    textLayer.el.batchDraw();
    // Apply some blur to the image
    blurImage();
    // create textarea and style it
    textAreaInit(); // returns textarea
    let rotation = textNode.el.rotation();
    var transform = '';
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)';
    }
    textarea.style.transform = transform;
    textarea.focus();


    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    });
  });
}
textNode.init = init;

function handleOutsideClick(e) {
  if (e.target !== textarea) {
    textNode.el.text(textarea.value);
    console.log(textNode.el);

    textLayer.el.batchDraw();
    removeTextarea();
  }
}

function textAreaInit() {
  console.log('textareainit');
  // setting textarea position
  var textPosition = textNode.el.absolutePosition();
  var stageBox = myStage.el.container().getBoundingClientRect();
  var areaPosition = {
    x: stageBox.left + textPosition.x,
    y: stageBox.top + textPosition.y,
  };
  // Create a new textarea element on the page
  textarea = document.createElement('textarea');
  document.body.appendChild(textarea);

  textarea.value = textNode.el.text();
  textarea.style.position = 'absolute';
  textarea.style.top = areaPosition.y + 'px';
  textarea.style.left = areaPosition.x + 'px';
  textarea.style.width = textNode.el.width() - textNode.el.padding() * 2 + 'px';
  textarea.style.height =
    textNode.el.height() - textNode.el.padding() * 2 + 5 + 'px';
  textarea.style.fontSize = textNode.el.fontSize() + 'px';
  textarea.style.border = 'none';
  textarea.style.padding = '0px';
  textarea.style.margin = '0px';
  textarea.style.overflow = 'hidden';
  textarea.style.background = '#ccc5';
  textarea.style.outline = 'none';
  textarea.style.resize = 'none';
  textarea.style.lineHeight = textNode.el.lineHeight();
  textarea.style.fontFamily = textNode.el.fontFamily();
  textarea.style.transformOrigin = 'left top';
  textarea.style.textAlign = textNode.el.align();
  textarea.style.color = textNode.el.fill();

  function setTextareaWidth(newWidth) {
    if (!newWidth) {
      // set width for placeholder
      newWidth = textNode.el.placeholder.length * textNode.el.fontSize();
    }
    textarea.style.width = newWidth + 'px';
  }

  // textarea events
  textarea.addEventListener('keydown', function (e) {
    // hide on enter
    // but don't hide on shift + enter
    if (e.keyCode === 13 && !e.shiftKey) {
      textNode.el.text(textarea.value);
      removeTextarea();
    }
    // on esc do not set value back to node
    if (e.keyCode === 27) {
      removeTextarea();
    }
  });

  textarea.addEventListener('keydown', function (e) {
    let scale = textNode.el.getAbsoluteScale().x;
    setTextareaWidth(textNode.el.width() * scale);
    textarea.style.height = 'auto';
    textarea.style.height =
      textarea.scrollHeight + textNode.el.fontSize() + 'px';
  });
  //  return textarea;
}

function handleTransform() {
  // reset scale, so only width is changing by transformer
  textNode.el.setAttrs({
    width: textNode.width() * textNode.scaleX(),
    scaleX: 1,
    height: textNode.height() * textNode.scaleY(),
    scaleY: 1,
  });
}

function blurImage() {
  console.log('IMAGEEEE', image)
  var img = image.el;
  var originalBlur = img.blurRadius();
  img.cache();
  img.filters([Konva.Filters.Blur]);
  img.blurRadius(5);
  imgLayer.el.batchDraw();
}

function removeTextarea() {
  textarea.parentNode.removeChild(textarea);
  window.removeEventListener('click', handleOutsideClick);
  textNode.el.show();
  transformer.el.show();
  transformer.el.forceUpdate();
  textLayer.el.draw();
  image.el.blurRadius(originalBlur);
  imgLayer.el.batchDraw();
}

export default textNode;
