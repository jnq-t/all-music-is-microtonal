import Scale from "../classes/Scale.js";
import Keyboard from "../classes/Keyboard.js"
import createKeyboardContainer from "./createKeyboard.js"
import createKeyElement from "./createKeys.js";
import createEle from "../utilities/createBasicDomElement.js"

const generateScaleBtn = document.getElementById('generate-scale-btn');
const author = document.getElementById('scale-author-input');
const scaleName = document.getElementById('scale-name-input');
const startingFreq = document.getElementById('starting-frequency-input');
const lengthOfScale = document.getElementById('length-of-scale-input');

generateScaleBtn.addEventListener('click', appendKeyboard ); // creates & appends keyboard on click

function appendKeyboard () {
   // grabs data from DOM
    const scaleData = {
      scaleName: scaleName.value,
      author: author.value,
      startingFreq: startingFreq.value,
      lengthOfScale: lengthOfScale.value
    };
    // todo: send same data to API call & newScale; right now i am writing it twice since it isn't getting picked up from scaleData
    const newScale = new Scale(author.value, scaleName.value, startingFreq.value, lengthOfScale.value); //todo: send scale data.. find issue and resovle
    const newKeyboard = new Keyboard(newScale) // calls Keyboard class
    const allKeysContainer = createEle('div', 'keys-container') // creates parent <div/> for key elements
    const keyboardContainer = createKeyboardContainer() // creates parent <div/> for keyboard elements
    const wrapper = document.getElementById('keyboards-wrapper') // wrapper for all keyboards on DOM
    console.log('New Scale: ', newScale)
    
    //creates keys & maps through to create DOM element for each 
    newKeyboard.keys().map((key, index) => {
        createKeyElement(key, index, allKeysContainer);
    });

    keyboardContainer.appendChild(allKeysContainer) // appends keys to parent <div/> 
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