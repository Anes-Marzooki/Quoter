import imageNode from './imageNode.js';
import text from '../text/index.js';
import controls from '../controlPanel/index.js'

let imgName = {};
const init = () => {
  var imgInput = document.getElementById("input-file");
  imgInput.addEventListener("change", handleInputChange);
}

const handleInputChange = function (e) {
  let file = e.target.files[0];
  imgName.name = e.target.files[0].name;
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function (e) {
    imageNode.init(e.target.result, (err) => {
      console.log('image callback')
      //      controls.controls.blur();

      text.textNode.init();
      //      text.transformer.init();
    });
  }

}

export default {
  init: init
}
