
import createEle from "../utilities/createBasicDomElement.js"
import createInput from "../utilities/createInput.js"
import createInputLabel from "../utilities/createInputLabel.js"
import keyModifierTypes from "../utilities/keyModifierTypes.js"

const mock_octave = 12 // todo: remove mock_octave

/**
 * @method createKeyboardTopNav creates top menu navigation for keyboard
 */
export default function createKeyboardTopNav () {
  const topNav = Object.assign(document.createElement('nav'), // DOM nav container
    {className: 'keyboard-top-nav'},
    {id: 'keyboard-top-nav'}
  )

  topNav.appendChild( addOrRemoveOctave(mock_octave) ) // todo: remove mock_octave
  topNav.appendChild( keyModifierOptions() )
  // topNav.appendChild(scaleDataInputs) // appends item list to <nav/>
  
  return topNav
}

/**
 * @method keyModifierOptions DOM setup to toggle key modifiers on/off
 */
function keyModifierOptions () {
  const editKeysNav = createEle('nav', 'keys-edit-nav');

  // sustain edit mode
  const sustainContainer = createEle('div', 'edit-keys-option-container');
        sustainContainer.id = 'sustain-edit-mode';
        const sustainMode = createInput('edit-keys-option', 'sustain-edit', 'checkbox', 'Turn edit on for key sustain');
        sustainContainer.appendChild( sustainMode );
        sustainContainer.appendChild( createInputLabel('edit-keys-option-label', 'sustain-edit', 'Sustain') );
        
        sustainMode.addEventListener('click', function(e){
            const modifiers = document.querySelectorAll(`.modifier-sustain-hidden`)
            const modifiersArray = [...modifiers]
            modifiersArray.map(modifier => modifier.classList.toggle(`modifier-sustain-show`))
          
        })

  // detune edit mode
  const detuneContainer = createEle('div', 'edit-keys-option-container');
        detuneContainer.id = 'detune-edit-mode';
  const detuneMode = createInput('edit-keys-option', 'detune-edit', 'checkbox', 'Turn edit on for key detune');
        detuneContainer.appendChild( detuneMode );
        detuneContainer.appendChild( createInputLabel('edit-keys-option-label', 'detune-edit', 'Detune') );
  
        detuneMode.addEventListener('click', function(e){
          const modifiers = document.querySelectorAll(`.modifier-detune-hidden`)
          const modifiersArray = [...modifiers]
          modifiersArray.map(modifier => modifier.classList.toggle(`modifier-detune-show`))
        
      })
        
  // ratio edit mode
  const ratioContainer = createEle('div', 'edit-keys-option-container');
        ratioContainer.id = 'ratio-edit-mode';
  const ratioMode = createInput('edit-keys-option', 'ratio-edit', 'checkbox', 'Turn edit on for key ratio');
        ratioContainer.appendChild( ratioMode );
        ratioContainer.appendChild( createInputLabel('edit-keys-option-label', 'ratio-edit', 'Ratio') );

        ratioMode.addEventListener('click', function(e){
          const modifiers = document.querySelectorAll(`.modifier-ratio-hidden`)
          const modifiersArray = [...modifiers]
          modifiersArray.map(modifier => modifier.classList.toggle(`modifier-ratio-show`))
        
      })
  // append items to nav container
  editKeysNav.appendChild(sustainContainer);
  editKeysNav.appendChild(detuneContainer);
  editKeysNav.appendChild(ratioContainer);

  return editKeysNav;
}

// TODO: refactor addOrRemoveOctave method
/**
 * 
 * @param {Number} scaleLength 
 */
function addOrRemoveOctave(scaleLength) {
  let numOfOctavesShown = 2; 
  const container = createEle('div', 'add-remove-octaves-container');
  const addOctaveBtn = Object.assign(document.createElement("button"), 
    {id: "add-octave-btn"},
    {value: "Add Octave"},
    {ariaLabel: "Add an octave to the webpage"},
    {innerText: "Add Octave"}
  );
  const removeOctaveBtn = Object.assign(document.createElement("button"), 
    {id: "remove-octave-btn"},
    {value: "Remove Octave"},
    {ariaLabel: "Remove an octave from the webpage"},
    {innerText: "Remove Octave"}
  );

  // add octave 
  addOctaveBtn.addEventListener('click', () => {
    numOfOctavesShown ++;
    const keysToShow = numOfKeysToShow(scaleLength, numOfOctavesShown);

    for(let i = 1; i <= keysToShow; i++ ) {
      document.getElementById(`key-container${i}`).classList.remove('key-container-hidden')
      document.getElementById(`key-container${i}`).classList.add('key-container-show')
    }
  })

  // remove octave 
  removeOctaveBtn.addEventListener('click', () => {
    const currentKeys = numOfKeysToShow(scaleLength, numOfOctavesShown);

    if(numOfOctavesShown >= 2) {
      numOfOctavesShown --;
      const keysToShow = numOfKeysToShow(scaleLength, numOfOctavesShown);
      console.log(currentKeys, keysToShow)
      
      for(let i =1; i<= currentKeys; i++) {
        if (i > keysToShow) {
          document.getElementById(`key-container${i}`).classList.remove('key-container-show')
          document.getElementById(`key-container${i}`).classList.add('key-container-hidden')
        }
      }
    } else { 
      console.log('Cannot remove initial octave') 
    }
    
  })

  container.appendChild(addOctaveBtn);
  container.appendChild(removeOctaveBtn);

  return container
}

function numOfKeysToShow (scaleLength, numOfOctavesShown) {
  return scaleLength * numOfOctavesShown
}
