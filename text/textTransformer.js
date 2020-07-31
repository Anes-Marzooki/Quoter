import textNode from './textNode.js';
import textLayer from '../layers/textLayer.js'

let transformer = {};

function init(element) {
  transformer.el = new Konva.Transformer({
    node: element,
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
  textLayer.el.add(transformer.el);
  textLayer.el.draw();
}
transformer.init = init;

export default transformer
