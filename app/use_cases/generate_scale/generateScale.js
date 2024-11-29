import createKeyboardContainer from "./createKeyboard.js"
import createKeyElement from "./createKeys.js";
import createEle from "../../utilities/createBasicDomElement.js"
import Scale from "../../classes/Scale.js"
import Keyboard from "../../classes/Keyboard.js"

const scaleName = document.getElementById('scale-name-input');
const startingFreq = document.getElementById('starting-frequency-input');
const lengthOfScale = document.getElementById('length-of-scale-input');
const octaveSpan = document.getElementById('octave-span-input');
const generateScaleBtn = document.getElementById('generate-scale-btn'); 

generateScaleBtn.addEventListener('click', appendKeyboard );


function appendKeyboard () { 
  // if keyboard already exists, it is removed and replaced removes previous scale and generates a new one scale
  if(document.getElementById('keyboard1')) { document.getElementById('keyboard1').remove() }
  
  const scaleData = {
    scaleName: scaleName.value,
    startingFreq: Number(startingFreq.value),
    lengthOfScale: Number(lengthOfScale.value),
    octaveSpan: Number(octaveSpan.value)
  };

  const currentScale = new Scale(scaleData.scaleName, scaleData.startingFreq, scaleData.lengthOfScale, scaleData.octaveSpan)
  const currentKeyboard = new Keyboard(currentScale) // creates keyboard class
  const currentKeys = currentKeyboard.keys() // creates keys
  const allKeyboardsDomWrapper = document.getElementById('keyboards-wrapper'); // wrapper for all keyboards on DOM
  const keyboardDomContainer = createKeyboardContainer(scaleData.lengthOfScale); // creates parent <div/> for keyboard elements
  const allKeysDomContainer = createEle('div', 'keys-container'); // creates parent <div/> for key elements
  
  console.log(currentKeyboard)
  
  // creates keys & maps through to create DOM element for each 
  currentKeys.map((key, index) => {
      createKeyElement(key, index, allKeysDomContainer, scaleData.lengthOfScale, currentKeyboard);
  });
  
  keyboardDomContainer.appendChild(allKeysDomContainer); // appends keys to parent <div/> 
  allKeyboardsDomWrapper.appendChild(keyboardDomContainer); // appends keyboard to wrapper <div/>
  
  // event listener to execute midi tone on key click
  document.addEventListener('click', ({target}, keyboard) => {
    keyboard = currentKeyboard // defines current keyboard in scope

    // if a key is clicked on the DOM, finds key  
    if(target.classList.contains('keyboard-key')) {
      const keyIndex = target.getAttribute('index'); 
      const targetKey = currentKeyboard.findKey(keyIndex); 

      targetKey.play();
    }
  })
}

//this method creates a new scale in our database, not currently used 
//todo: move this function out to "save" button onclick event -- look at figma design for reference
const addScaleToDatabase = async (scaleData) => {
  await fetch(`http://localhost:8080/api/scale`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(scaleData)
  }).then(resp => resp.json());
}
