import Scale from "../classes/Scale.js";
import Keyboard from "../classes/Keyboard.js"
import ScaleDegree from "../classes/ScaleDegree.js"
import ScaleDegreeModifier from "../classes/ScaleDegreeModifier.js" 

const generateScaleBtn = document.getElementById('generate-scale-btn');
const author = document.getElementById('scale-author-input')
const scaleName = document.getElementById('scale-name-input')
const startingFreq = document.getElementById('starting-frequency-input')
const lengthOfScale = document.getElementById('length-of-scale-input')

generateScaleBtn.addEventListener('click', appendKeyboard ) // creates & appends keyboard on click


async function appendKeyboard () {
   // grabs data from DOM
    const scaleData = {
      scaleName: scaleName.value,
      author: author.value,
      startingFreq: startingFreq.value,
      lengthOfScale: lengthOfScale.value
    }
   
    // todo: send same data to API call & newScale; right now i am writing it twice since it isn't getting picked up from scaleData
    const newScale = new Scale(author.value, scaleName.value, startingFreq.value, lengthOfScale.value); //todo: send scale data.. find issue and resovle
    const newKeyboard = new Keyboard(newScale)
    const keyboardContainer = createKeyboardContainer()
    const parentContainer = document.getElementById('keyboards-parent-container') // parent 'div' container for all keyboards on DOM
   
    //creates keys & maps through to create dom element for each 
    newKeyboard.keys().map((key, index) => {
        createKeyElement(key, index, keyboardContainer)
    })

    parentContainer.appendChild(keyboardContainer)

  }


  
  /**
   * @method createKeyboardContainer creates <div/> container for each key
   */
  function createKeyboardContainer() {
    const keyboards = document.getElementsByClassName("keyboard-container").length;  //grab num of keyboards on page to create index for ID name
    const div = Object.assign(document.createElement('div'), 
        { className: 'keyboard-container' }, 
        { id: `keyboard${keyboards+1}`},
        {innerHTML: 'generateScale.js - not working<br/>'}
    );
    return div;
  };

  /**
   * @method createKeyElement creates <button/> element for each key
   * @param {Object} key object {}
   * @param {Index} index of key
   * @param {Function} container appends each key to <div/> => createKeyboardContainer()
   */
  function createKeyElement (key, index, container ) {
    const mock_octave = 24 // todo: replace with scale.length — logic currently shows first 24 notes in scale
    
    const btn = Object.assign(document.createElement('button'), 
        { className: `keyboard-key ${ index < mock_octave ? 'keyboard-key-show' : 'keyboard-key-hidden'}` }, // initial logic for which keys to show/hide
        { id: `keyboard-key${index}` }, 
        { name: `${key.frequency}` }, 
        { innerHTML: `${roundFreq(key.frequency, 3)}` }, // todo: change to scale position (e.g. scale degree "8") + rounded freq.
        { ariaLabel: 'Button to play frequency' }
        // { setAttribute: `key-position-${position}` } // todo: add scale position; should it be an attribute or additional class? google use case
    );
    container.appendChild(btn);
  }

  /**
   * @method roundFreq shortens float for DOM display - purely UI/UX
   * @param {Object} float key.frequency float
   * @param {Int} places = which decimal point to round to
   */
    function roundFreq(float, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(float * multiplier) / multiplier;
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