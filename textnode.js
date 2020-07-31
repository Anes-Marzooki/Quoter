// create a text shape
var textNode = new Konva.Text({
  text: 'Place Holder',
  x: 75,
  y: 80,
  fontSize: 20,
  draggable: true,
  width: 150,
});

// transformer
var tr = new Konva.Transformer({
  node: textNode,
  enabledAnchors: ['middle-left', 'middle-right', 'bottom-center'],
  anchorFill: 'transparent',
  anchorStroke: 'transparent',
  anchorCornerRadius: 5,
  anchorFill: 'white',
  rotateAnchorOffset: 20,
  borderStroke: 'cyan',
  id: 'tr',
  visibility: true,
  // set minimum width of text
  boundBoxFunc: function (oldBox, newBox) {
    newBox.width = Math.max(30, newBox.width);
    return newBox;
  },
});

textNode.on('transform', function () {
  // reset scale, so only width is changing by transformer
  textNode.setAttrs({
    width: textNode.width() * textNode.scaleX(),
    scaleX: 1,
    height: textNode.height() * textNode.scaleY(),
    scaleY: 1,
  });
});
var originalBlur;

textNode.on('dblclick', () => {
  // hide text node and transformer:
  textNode.hide();
  tr.hide();
  // TEMPO
  // FIXME: seperate the layers from the shapes.
  //  var img = layer1.children[0];
  var img = myStage.find('#my-image')[0];
  var originalBlur = img.blurRadius();
  img.cache();
  img.filters([Konva.Filters.Blur]);
  img.blurRadius(5);
  layer1.batchDraw();
  // setting textarea position
  var textPosition = textNode.absolutePosition();
  var stageBox = myStage.container().getBoundingClientRect();
  var areaPosition = {
    x: stageBox.left + textPosition.x,
    y: stageBox.top + textPosition.y,
  };
  // create textarea and style it
  var textarea = document.createElement('textarea');
  //            textarea.setAttribute('contenteditable', true);
  document.body.appendChild(textarea);
  // style
  textarea.value = textNode.text();
  textarea.style.position = 'absolute';
  textarea.style.top = areaPosition.y + 'px';
  textarea.style.left = areaPosition.x + 'px';
  textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
  textarea.style.height =
    textNode.height() - textNode.padding() * 2 + 5 + 'px';
  textarea.style.fontSize = textNode.fontSize() + 'px';
  textarea.style.border = 'none';
  textarea.style.padding = '0px';
  textarea.style.margin = '0px';
  textarea.style.overflow = 'hidden';
  textarea.style.background = '#ccc5';
  textarea.style.outline = 'none';
  textarea.style.resize = 'none';
  textarea.style.lineHeight = textNode.lineHeight();
  textarea.style.fontFamily = textNode.fontFamily();
  textarea.style.transformOrigin = 'left top';
  textarea.style.textAlign = textNode.align();
  textarea.style.color = textNode.fill();
  rotation = textNode.rotation();
  var transform = '';
  if (rotation) {
    transform += 'rotateZ(' + rotation + 'deg)';
  }
  textarea.style.transform = transform;
  // reset height
  //        textarea.style.height = 'auto';
  //        // after browsers resized it we can set actual value
  //        textarea.style.height = textarea.scrollHeight + 3 + 'px';

  textarea.focus();

  function removeTextarea() {
    textarea.parentNode.removeChild(textarea);
    window.removeEventListener('click', handleOutsideClick);
    textNode.show();
    tr.show();
    tr.forceUpdate();
    img.blurRadius(originalBlur);
    layer1.batchDraw();
  }

  function setTextareaWidth(newWidth) {
    if (!newWidth) {
      // set width for placeholder
      newWidth = textNode.placeholder.length * textNode.fontSize();
    }
    textarea.style.width = newWidth + 'px';
  }
  textarea.addEventListener('keydown', function (e) {
    // hide on enter
    // but don't hide on shift + enter
    if (e.keyCode === 13 && !e.shiftKey) {
      textNode.text(textarea.value);
      removeTextarea();
    }
    // on esc do not set value back to node
    if (e.keyCode === 27) {
      removeTextarea();
    }
  });

  textarea.addEventListener('keydown', function (e) {
    scale = textNode.getAbsoluteScale().x;
    setTextareaWidth(textNode.width() * scale);
    textarea.style.height = 'auto';
    textarea.style.height =
      textarea.scrollHeight + textNode.fontSize() + 'px';
  });

  function handleOutsideClick(e) {
    if (e.target !== textarea) {
      textNode.text(textarea.value);
      removeTextarea();
    }
  }
  setTimeout(() => {
    window.addEventListener('click', handleOutsideClick);
  });
});
