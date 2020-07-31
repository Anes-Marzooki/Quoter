import textLayer from '../layers/textLayer.js';
import tr from '../text/textTransformer.js';
import imgName from '../image/image_input.js';
import stage from '../stage/index.js';


// Download
function downloadURI(uri, name) {
  var link = document.createElement("a");
  console.log(name);
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  //  delete link;
  link = null;
}
document.getElementById('download-btn').addEventListener('click', function () {
  //  tr.el.enabledAnchors = false;
  //  tr.el.borderStroke = 'red';
  // TODO: create a function to toggle the transformer on and off.
  tr.el.hide();
  textLayer.el.add(tr.el)
  textLayer.el.draw();
  let dataURL = stage.el.toDataURL();
  downloadURI(dataURL)
})

export default {
  download: downloadURI
}
