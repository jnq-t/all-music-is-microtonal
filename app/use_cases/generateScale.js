import Scale from "../classes/Scale.js";
import Keyboard from "../classes/Keyboard.js"
import createKeyboardContainer from "./createKeyboard.js"
import createKeyElement from "./createKeys.js";
import createEle from "../utilities/createBasicDomElement.js"

const generateScaleBtn = document.getElementById('generate-scale-btn');
const scaleName = document.getElementById('scale-name-input');
const startingFreq = document.getElementById('starting-frequency-input');
const lengthOfScale = document.getElementById('length-of-scale-input');
const octaveSpan = document.getElementById('octave-span-input');

generateScaleBtn.addEventListener('click', appendKeyboard ); // creates & appends keyboard on click

function appendKeyboard () { 
  // if keyboard already exists, it is removed and replaced removes previous scale and generates a new one scale
  if(document.getElementById('keyboard1')) { document.getElementById('keyboard1').remove() }
   
  // grabs data from DOM
    const scaleData = {
      scaleName: scaleName.value,
      startingFreq: Number(startingFreq.value),
      lengthOfScale: Number(lengthOfScale.value),
      octaveSpan: Number(octaveSpan.value)
    };
    
    const newScale = new Scale(scaleData.scaleName, scaleData.startingFreq, scaleData.lengthOfScale, scaleData.octaveSpan); 
    const newKeyboard = new Keyboard(newScale);
    const allKeysContainer = createEle('div', 'keys-container'); // creates parent <div/> for key elements
    const keyboardContainer = createKeyboardContainer(scaleData.lengthOfScale); // creates parent <div/> for keyboard elements
    const wrapper = document.getElementById('keyboards-wrapper'); // wrapper for all keyboards on DOM
    console.log('New Scale: ', newScale)
    
    //creates keys & maps through to create DOM element for each 
    newKeyboard.keys().map((key, index) => {
        createKeyElement(key, index, allKeysContainer, scaleData.lengthOfScale);
    });

    keyboardContainer.appendChild(allKeysContainer); // appends keys to parent <div/> 
    wrapper.appendChild(keyboardContainer); // appends keyboard to wrapper <div/>
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

// testing to figure out new and better way to call synth 
async function callSynth(key) {
  await Tone.start();
  
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();

  // trigger the attack immediately
  synth.triggerAttack(key.frequency, now);
  // wait one second before triggering the release
  synth.triggerRelease(now + 0.2); //todo: make release time a variable the user can change
}

// working synth test
document.addEventListener('click', async ({target}) => {
  if(target.classList.contains('keyboard-key')) {
      await Tone.start();
      
      const frequency = target.getAttribute('name')
      const synth = new Tone.Synth().toDestination();
      const now = Tone.now();

      // trigger the attack immediately
      synth.triggerAttack(frequency, now);
      // wait one second before triggering the release
      synth.triggerRelease(now + 0.2); //todo: make release time a variable the user can change
  }
})