
import createEle from "../utilities/createBasicDomElement.js"
import roundFreq from "../utilities/roundFreq.js"
import KeyModifiers from "./createKeyModifiers.js"

//todo: refactor code
//todo: remove mock_length and mock_octave. mock_length is used for detune&ratio to be only set for 1st octave; mock_octave is to generate the first octave (or first 2 octaves) of scale. Currently I set mock_octave at 24 so I could see 2 octaves at once
const mock_length = 12;
const mock_octave = 24 

  /**
   * @method createKeyElement creates keys for keyboard; includes modifiers and button for playing frequency
   * @param {Object} key object {}
   * @param {Index} index of key
   * @param {Function} container <div/> element to append each key to keysContainer
   */
  export default function createKeyElement (key, index, container ) {
    
    const keyContainer = createEle('div', `${ index < mock_octave ? 'key-container-show' : 'key-container-hidden'}`)
    const btn = Object.assign(document.createElement('button'), 
        { className: `${ index < mock_octave ? 'keyboard-key-show' : 'keyboard-key-hidden'}` }, // initial logic for which keys to show/hide
        { id: `keyboard-key${index}` }, 
        { name: `${key.frequency}` }, 
        { innerHTML: `${roundFreq(key.frequency, 3)}` }, // todo: change to scale position (e.g. scale degree "8") + rounded freq.
        { ariaLabel: 'Button to play frequency' }
        // { setAttribute: `key-position-${position}` } // todo: add scale position; should it be an attribute or additional class? google use case
    );

    keyContainer.appendChild(btn); // appends keyBtn to parent <div/> => keyContainer
    keyContainer.appendChild(KeyModifiers.createSustainModifier(index, mock_octave)) // appends sustain modifier to parent <div/> => keyContainer
   
    // appends detune and ratio modifier to first octave only //todo: replace mock_length with actual length
    if (index < mock_length) {
      keyContainer.appendChild(KeyModifiers.createDetuneModifier(index, mock_octave))
      keyContainer.appendChild(KeyModifiers.createRatioModifier(index, mock_octave))
    }

    //appends each key to parent <div/> => keysContainer
    container.appendChild(keyContainer);
  }
