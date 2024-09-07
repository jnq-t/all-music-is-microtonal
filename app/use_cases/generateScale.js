import Scale from "../classes/Scale.js";
import Keyboard from "../classes/Keyboard.js"

const generateScaleBtn = document.getElementById('generate-scale-btn');
const author = document.getElementById('scale-author-input');
const scaleName = document.getElementById('scale-name-input');
const startingFreq = document.getElementById('starting-frequency-input');
const lengthOfScale = document.getElementById('length-of-scale-input');

generateScaleBtn.addEventListener('click', appendKeyboard ); // creates & appends keyboard on click

const mock_length = 12;

async function appendKeyboard () {
   // grabs data from DOM
    const scaleData = {
      scaleName: scaleName.value,
      author: author.value,
      startingFreq: startingFreq.value,
      lengthOfScale: lengthOfScale.value
    };
   
    // todo: send same data to API call & newScale; right now i am writing it twice since it isn't getting picked up from scaleData
    const newScale = new Scale(author.value, scaleName.value, startingFreq.value, lengthOfScale.value); //todo: send scale data.. find issue and resovle
    const newKeyboard = new Keyboard(newScale)
    const keyboardContainer = createKeyboardContainer()
    const allKeysContainer = createEle('div', 'keys-container')
    const wrapper = document.getElementById('keyboards-wrapper') // parent 'div' wrapper for all keyboards on DOM
   
    //creates keys & maps through to create dom element for each 
    newKeyboard.keys().map((key, index) => {
        createKeyElement(key, index, allKeysContainer);
    });

    keyboardContainer.appendChild(allKeysContainer)
    keyboardContainer.appendChild( createKeyboardSideMenu() )

    wrapper.appendChild(keyboardContainer);

  }

  /**
   * @method createKeyboardContainer creates parent <div/> for keyboard
   */
  function createKeyboardContainer() {
    const keyboards = document.getElementsByClassName("keyboard-container").length;  //grab num of keyboards on page to create index for ID name
    const div = Object.assign(document.createElement('div'), 
        { className: 'keyboard-container' }, 
        { id: `keyboard${keyboards+1}`},
    );

    div.appendChild( createKeyboardTopNav() )

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
    const keyContainer = createEle('div', `${ index < mock_octave ? 'key-container-show' : 'key-container-hidden'}`)
    const btn = Object.assign(document.createElement('button'), 
        { className: `${ index < mock_octave ? 'keyboard-key-show' : 'keyboard-key-hidden'}` }, // initial logic for which keys to show/hide
        { id: `keyboard-key${index}` }, 
        { name: `${key.frequency}` }, 
        { innerHTML: `${roundFreq(key.frequency, 3)}` }, // todo: change to scale position (e.g. scale degree "8") + rounded freq.
        { ariaLabel: 'Button to play frequency' }
        // { setAttribute: `key-position-${position}` } // todo: add scale position; should it be an attribute or additional class? google use case
    );

    keyContainer.appendChild(btn);
    keyContainer.appendChild(createSustainModifier(index, mock_octave))
    // adds detuen and ratio modifer to first octave only //todo: replace mock_length with actual length
    if (index < mock_length) {
      keyContainer.appendChild(createDetuneModifier(index, mock_octave))
      keyContainer.appendChild(createRatioModifier(index, mock_octave))
    }
    container.appendChild(keyContainer);
  }

  // ALL keys get sustain; only first octave gets detune & ratio, since change on one degree wil effect all octaves
  function createSustainModifier(index, mock_octave) {
    const modifierContainer = createEle('div', `scale-degree-modifier-container ${ index < mock_octave ? 'modifier-sustain-show' : 'modifier-sustain-hidden'}`)
    const sustainLabel = Object.assign(document.createElement('label'), 
      {className: `sustain-scale-degree-label`},
      {for: "sustain-scale-degree"},
      {innerHTML: "Sustain"}
    )

    const sustainInput = Object.assign(document.createElement('input'), 
        { className: `sustain-scale-degree scale-degree-modifier` },
        { name: `sustain-scale-degree` }, 
        { ariaLabel: 'Sustain scale degree' },
        { label: 'Sustain scale degree' },
        {type: "checkbox"}
    )

    modifierContainer.appendChild(sustainLabel);
    modifierContainer.appendChild(sustainInput);

    return modifierContainer
  }

  // only placed on first octave
  function createDetuneModifier(index, mock_octave) {
    const modifierContainer = createEle('div', `scale-degree-modifier-container  ${ index < mock_octave ? 'modifier-detune-show' : 'modifier-detune-hidden'}`)
    const detuneLabel = Object.assign(document.createElement('label'), 
      {className: `detune-scale-degree-label`},
      {for: "detune-scale-degree"},
      {innerHTML: "Detune"}
    )

    const detuneInput = Object.assign(document.createElement('input'), 
        { className: `detune-scale-degree scale-degree-modifier` },
        { name: `detune-scale-degree` }, 
        { ariaLabel: 'Detune scale degree' },
        { label: 'Detune scale degree' },
        {type: "number"}
    )

    modifierContainer.appendChild(detuneLabel);
    modifierContainer.appendChild(detuneInput);

    return modifierContainer
  }

  // only placed on first octave
  function createRatioModifier(index, mock_octave) {
    const modifierContainer = createEle('div', `scale-degree-modifier-container ${ index < mock_octave ? 'modifier-ratio-show' : 'modifier-ratio-hidden'}`, 'Ratio')
  
    const numeratorInput = Object.assign(document.createElement('input'), 
        { className: `numerator-ratio-scale-degree scale-degree-modifier` },
        { name: `numerator-ratio-scale-degree` }, 
        { ariaLabel: 'Scale degree numerator ratio' },
        { label: 'Scale degree numerator ratio' },
        {type: "number"}
    )
    const denominatorInput = Object.assign(document.createElement('input'), 
        { className: `denominator-ratio-scale-degree scale-degree-modifier` },
        { name: `denominator-ratio-scale-degree` }, 
        { ariaLabel: 'Scale degree denominator ratio' },
        { label: 'Scale degree denominator ratio' },
        {type: "number"}
    )

    modifierContainer.appendChild(numeratorInput);
    modifierContainer.appendChild(denominatorInput);

    return modifierContainer
  }
  

  function createEle (ele, eleClassName, eleText) {
    const element = Object.assign(document.createElement(ele), 
      {className: eleClassName},
      {innerText: eleText ? eleText : ''}
    )
    return element
  }

  function createKeyboardTopNav () {
    const topNav = Object.assign(document.createElement('nav'), 
      {className: `keyboard-top-nav`},
    )
    const ul = Object.assign(document.createElement('ul'), 
    {className: `keyboard-top-nav-items`},
    )

    ul.appendChild( createEle('li', 'keyboard-top-nav-list-item nav-item', 'Scale Name') )
    ul.appendChild( createEle('li', 'keyboard-top-nav-list-item nav-item', 'Starting Frequency') )
    ul.appendChild( createEle('li', 'keyboard-top-nav-list-item nav-item', 'Octave Length') )
    ul.appendChild( createEle('li', 'keyboard-top-nav-list-item nav-item', 'Octave Span') )

    topNav.appendChild(ul)
    return topNav
  }

  function createKeyboardSideMenu () {
    //hold side nav + extra elements
    const menuDiv = createEle('div', 'keyboard-side-menu-container')
    const sideNav = createEle('nav', 'keyboard-side-nav');
    const ul = createEle('ul', 'keyboard=side-nav-items')

    ul.appendChild( createEle('li', 'keyboard-side-nav-list-item nav-item', 'Sustain') )
    ul.appendChild( createEle('li', 'keyboard-side-nav-list-item nav-item', 'Detune') )
    ul.appendChild( createEle('li', 'keyboard-side-nav-list-item nav-item', 'Ratio') )

    sideNav.appendChild(ul);
    menuDiv.appendChild(sideNav);

    // todo: save/delete and +/- octave

    return menuDiv
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
