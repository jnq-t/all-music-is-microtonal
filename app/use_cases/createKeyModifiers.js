import createEle from "../utilities/createBasicDomElement.js"
import createInput from "../utilities/createInput.js"
import createInputLabel from "../utilities/createInputLabel.js"
import keyModifierTypes from "../utilities/keyModifierTypes.js"

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
          
    const sustainLabel = createInputLabel('scale-degree-modifier-label sustain-scale-degree-label', 'sustain-scale-degree', 'Sustain');
    const sustainInput =  createInput('sustain-scale-degree scale-degree-modifier', 'sustain-scale-degree', 'checkbox', 'Sustain scale degree');
            sustainInput.addEventListener('click', function(){
            
                  console.log(sustainInput.parentNode)
                  const keyContainer = sustainInput.parentNode.parentNode.parentNode
                  const key = keyContainer.children[0]
                        key.classList.toggle(`sustain-mode`)
                      
            })
   
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

    const detuneLabel = createInputLabel('scale-degree-modifier-label detune-scale-degree-label', 'detune-scale-degree', 'Detune');
    const detuneInput = createInput('detune-scale-degree scale-degree-modifier', 'detune-scale-degree', 'number', 'Detune scale degree');
            
            detuneInput.addEventListener('input', (e) => {
                  const keyContainer = detuneInput.parentNode.parentNode.parentNode
                  const key = keyContainer.children[0]
                
                  if(e.target.value > 0 || e.target.value < 0) {
                        key.classList.add(`detune-mode`)
                        console.log(target.value)
                  } else {key.classList.remove(`detune-mode`)}
                  
            })

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
      const modifierContainer = createEle('div', 'scale-degree-modifier-container modifier-ratio-hidden');
          modifierContainer.id = `modifier-ratio${index+1}`;

      const ratioLabel = createInputLabel('scale-degree-modifier-label ratio-scale-degree-label', 'ratio-scale-degree', 'Ratio');
      const numeratorInput = createInput('numerator-ratio-scale-degree scale-degree-modifier', 'numerator-ratio-scale-degree', 'number', 'Scale degree numerator ratio');
      const denominatorInput = createInput('denominator-ratio-scale-degree scale-degree-modifier', 'denominator-ratio-scale-degree', 'number', 'Scale degree denominator ratio');
           
            numeratorInput.addEventListener('input', (e) => {
                  const keyContainer = numeratorInput.parentNode.parentNode.parentNode
                  const key = keyContainer.children[0]
            
                  if(e.target.value > 0 || e.target.value < 0) {
                        key.classList.add(`ratio-mode`)
                        console.log(target.value)
                  } else {key.classList.remove(`ratio-mode`)}
                  
            })


            denominatorInput.addEventListener('input', (e) => {
                  const keyContainer = denominatorInput.parentNode.parentNode.parentNode
                  const key = keyContainer.children[0]
            
                  if(e.target.value > 0 || e.target.value < 0) {
                        key.classList.add(`ratio-mode`)
                        console.log(target.value)
                  } else {key.classList.remove(`ratio-mode`)}
                  
            })

    modifierContainer.appendChild(ratioLabel);
    modifierContainer.appendChild(numeratorInput);
    modifierContainer.appendChild(denominatorInput);

    return modifierContainer;
  }

  export default { createSustainModifier, createDetuneModifier,  createRatioModifier, }

// UI styling for when edit modes are being used
//   document.addEventListener("click", function(e){
//       const target = e.target.closest(".scale-degree-modifier"); 
//       const keyContainer = target.parentNode.parentNode
//       const key = keyContainer.children[0]
//       // console.log(target.type)
//       keyModifierTypes.map(modifierType => {
//             if(target.name.includes(modifierType) && target.type === 'checkbox') {
//                   key.classList.toggle(`${modifierType}-mode`)
//             }
//             // console.log(target.value)
//             if(target.name.includes(modifierType) && target.type === 'number') {
//                   target.addEventListener('input', (e) => {
//                         if(e.target.value > 0 || e.target.value < 0) {
//                               key.classList.add(`${modifierType}-mode`)
//                               // console.log(target.value)
//                         } else {key.classList.remove(`${modifierType}-mode`)}
//                   })
//             } 
//       })
//     });
