import createEle from "../utilities/createBasicDomElement.js"
import createInput from "../utilities/createInput.js"
import createInputLabel from "../utilities/createInputLabel.js"

// Note: all keys get sustain; only first octave gets detune & ratio, since change on one degree wil effect all octaves
// todo: build out functionality; all modifiers should start as hidden and only show when checked off in the side nav
/**
 * @method createSustainModifier creates sustain modifier for each key
 * @param {Index} index of key
 * @param {mock_octave} number = length of octave
 */
function createSustainModifier(index, mock_octave) {
    const modifierContainer = createEle('div', 'scale-degree-modifier-container modifier-sustain-hidden');
          modifierContainer.id = `modifier-sustain${index+1}`;
          
    const sustainLabel = createInputLabel('sustain-scale-degree-label', 'sustain-scale-degree', 'Sustain');
    const sustainInput =  createInput('sustain-scale-degree scale-degree-modifier', 'sustain-scale-degree', 'checkbox', 'Sustain scale degree');

    modifierContainer.appendChild(sustainLabel);
    modifierContainer.appendChild(sustainInput);

    return modifierContainer;
  }

/**
 * @method createDetuneModifier creates detune modifier for first octave
 * @param {Index} index of key
 * @param {mock_octave} number = length of octave
 */
function createDetuneModifier(index, mock_octave) {
    const modifierContainer = createEle('div', 'scale-degree-modifier-container modifier-detune-hidden');
          modifierContainer.id = `modifier-detune${index+1}`;

    const detuneLabel = createInputLabel('detune-scale-degree-label', 'detune-scale-degree', 'Detune');
    const detuneInput = createInput('detune-scale-degree scale-degree-modifier', 'detune-scale-degree', 'number', 'Detune scale degree');

    modifierContainer.appendChild(detuneLabel);
    modifierContainer.appendChild(detuneInput);

    return modifierContainer;
  }

/**
 * @method createRatioModifier creates ratio modifier for first octave
 * @param {Index} index of key
 * @param {mock_octave} number = length of octave
 */
function createRatioModifier(index, mock_octave) {
    const modifierContainer = createEle('div', 'scale-degree-modifier-container modifier-ratio-hidden', 'Ratio');
          modifierContainer.id = `modifier-ratio${index+1}`;

    const numeratorInput = createInput('numerator-ratio-scale-degree scale-degree-modifier', 'numerator-ratio-scale-degree', 'number', 'Scale degree numerator ratio');
    const denominatorInput = createInput('denominator-ratio-scale-degree scale-degree-modifier', 'denominator-ratio-scale-degree', 'number', 'Scale degree denominator ratio');

    modifierContainer.appendChild(numeratorInput);
    modifierContainer.appendChild(denominatorInput);

    return modifierContainer;
  }

  export default { createSustainModifier, createDetuneModifier,  createRatioModifier, }

  