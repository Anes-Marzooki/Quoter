let stage = {};
import layers from '../layers/index.js';


function stageInit(w, h, callback) {
  stage.el = new Konva.Stage({
    container: 'stage-container',
    width: w,
    height: h,
  })
  // TODO: iterate over layers

  layers.imgLayer.init(stage); // image layer
  layers.txtLayer.init(stage); // text layer
  callback('xxx');
}
stage.init = stageInit

function addLayers() {
  let args = Array.from(arguments);
  //  console.log(args)
  args.forEach(el => stage.add(el))
}
//stage.add = addLayers;

export default stage;
