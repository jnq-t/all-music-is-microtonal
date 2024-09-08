import createEle from "../utilities/createDomElement.js"

//todo: replace mock_octave with user DOM input
//todo: refactor code
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

  export default { createSustainModifier, createDetuneModifier,  createRatioModifier, }