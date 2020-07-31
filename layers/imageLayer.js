const out = {};
//var layer;


const init = (stage) => {
  out.el = new Konva.Layer();
  stage.el.add(out.el);
}

// adds shapes to the layer in batch
const addAllElements = () => {
  let args = Array.from(arguments);
  args.forEach(el => out.el.add(el))
}
out.init = init;
out.addAll = addAllElements;

export default out;

// NOTE: var by reference vs by value
