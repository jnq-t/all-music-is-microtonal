import Scale from "../classes/Scale.js";
import Keyboard from "../classes/Keyboard.js";

const scaleName = document.getElementById('scale-name-input');
const startingFreq = document.getElementById('starting-frequency-input');
const lengthOfScale = document.getElementById('length-of-scale-input');
const octaveSpan = document.getElementById('octave-span-input');

const scaleData = {
    scaleName: scaleName.value,
    startingFreq: Number(startingFreq.value),
    lengthOfScale: Number(lengthOfScale.value),
    octaveSpan: Number(octaveSpan.value)
};
  
const currentScale = new Scale(scaleData.scaleName, scaleData.startingFreq, scaleData.lengthOfScale, scaleData.octaveSpan); 
const currentKeyboard = new Keyboard(currentScale);
const currentKeys = currentKeyboard.keys();

export  {scaleData, currentScale, currentKeyboard, currentKeys};