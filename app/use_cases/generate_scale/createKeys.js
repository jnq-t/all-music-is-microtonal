
import createEle from "../../utilities/createBasicDomElement.js"
import roundFreq from "../../utilities/roundFreq.js"
import KeyModifiers from "./createKeyModifiers.js"

//todo: refactor code

  /**
   * @method createKeyElement creates keys for keyboard; includes modifiers and button for playing frequency
   * @param {Object} key object {}
   * @param {Index} index of key
   * @param {Object} currentKeyboard of keyboard class
   * @param {Function} container <div/> element to append each key to keysContainer
   */
  export default function createKeyElement (key, index, container, lengthOfScale, currentKeyboard) {
    
    const keyContainer = createEle('div', `${ index < lengthOfScale ? 'key-container-show' : 'key-container-hidden'}`) // initial logic for which keys to show/hide
          keyContainer.id = `key-container${index+1}`

    const keyModifiersContainer = createEle('div', 'scale-degree-modifiers-container')
          
    const btn = Object.assign(document.createElement('button'), 
        { className: 'keyboard-key' },
        { id: `keyboard-key${index+1}` }, 
        { name: `${key.frequency}` }, 
        { innerHTML: `${roundFreq(key.frequency, 3)}` }, // todo: change to scale position (e.g. scale degree "8") + rounded freq.
        { ariaLabel: 'Button to play frequency' }
        // { setAttribute: `key-position-${position}` } // todo: add scale position; should it be an attribute or additional class? google use case
    );
        btn.setAttribute('index', index)
    
    keyModifiersContainer.appendChild( KeyModifiers.createSustainModifier(index, lengthOfScale, currentKeyboard)) // append sustain modifier
     if (index < lengthOfScale) { // appends detune and ratio modifier to first octave only 
      keyModifiersContainer.appendChild(KeyModifiers.createDetuneModifier(index, lengthOfScale, currentKeyboard))
      keyModifiersContainer.appendChild(KeyModifiers.createRatioModifier(index, lengthOfScale, currentKeyboard))
    }

    keyContainer.appendChild(btn); // appends keyBtn to parent <div/> => keyContainer
    keyContainer.appendChild(keyModifiersContainer) // appends key modifiers to parent <div/> => keyContainer

    //appends each key to parent <div/> => keysContainer
    container.appendChild(keyContainer);
  }