import imageInput from './image/image_input.js';
import stage from './stage/index.js';
import donwload from './controlPanel/index.js';

let stageW = 600;
let stageH = 400;

// init the stage with custom w and h
stage.init(stageW, stageH, (err) => {
  err ? console.log('error') : console.log('stage ready')
});

// init input DOM element 
imageInput.init();
