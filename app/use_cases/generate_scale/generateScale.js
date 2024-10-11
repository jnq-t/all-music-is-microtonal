import createKeyboardContainer from "./createKeyboard.js"
import createKeyElement from "./createKeys.js";
import createEle from "../../utilities/createBasicDomElement.js"
import {scaleData, currentKeyboard, currentKeys} from "../../utilities/currentScale.js"

const generateScaleBtn = document.getElementById('generate-scale-btn');
      generateScaleBtn.addEventListener('click', appendKeyboard ); // creates & appends keyboard on click

function appendKeyboard () { 
  // if keyboard already exists, it is removed and replaced removes previous scale and generates a new one scale
  if(document.getElementById('keyboard1')) { document.getElementById('keyboard1').remove() }
   
    // dom elements
    const allKeysContainer = createEle('div', 'keys-container'); // creates parent <div/> for key elements
    const keyboardContainer = createKeyboardContainer(scaleData.lengthOfScale); // creates parent <div/> for keyboard elements
    const wrapper = document.getElementById('keyboards-wrapper'); // wrapper for all keyboards on DOM
    
    // creates keys & maps through to create DOM element for each 
    currentKeys.map((key, index) => {
        createKeyElement(key, index, allKeysContainer, scaleData.lengthOfScale);
    });

    keyboardContainer.appendChild(allKeysContainer); // appends keys to parent <div/> 
    wrapper.appendChild(keyboardContainer); // appends keyboard to wrapper <div/>
    
    // Executes Tone.js on key click
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
