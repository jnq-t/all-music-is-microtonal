import createEle from "../utilities/createBasicDomElement.js"
import createInput from "../utilities/createInput.js"
import createInputLabel from "../utilities/createInputLabel.js"

/**
 * @method keyModifierOptions edit options for keys
 */
export default function keyModifierOptions () {
    const editKeysNav = createEle('nav', 'keys-edit-nav');

    const sustainContainer = createEle('div', 'edit-keys-option-container')
    sustainContainer.appendChild( createInput('edit-keys-option', 'sustain-edit', 'checkbox', 'Turn edit on for key sustain') )
    sustainContainer.id = 'sustain-edit-mode'
    sustainContainer.appendChild( createInputLabel('edit-keys-option-label', 'sustain-edit', 'Sustain'))

    const detuneContainer = createEle('div', 'edit-keys-option-container')
    detuneContainer.appendChild( createInput('edit-keys-option', 'detune-edit', 'checkbox', 'Turn edit on for key detune') )
    detuneContainer.id = 'detune-edit-mode'
    detuneContainer.appendChild( createInputLabel('edit-keys-option-label', 'detune-edit', 'Detune') )
    
    const ratioContainer = createEle('div', 'edit-keys-option-container')
    ratioContainer.appendChild( createInput('edit-keys-option', 'ratio-edit', 'checkbox', 'Turn edit on for key ratio') )
    ratioContainer.id = 'ratio-edit-mode'
    ratioContainer.appendChild( createInputLabel('edit-keys-option-label', 'ratio-edit', 'Ratio') )

    editKeysNav.appendChild(sustainContainer);
    editKeysNav.appendChild(detuneContainer);
    editKeysNav.appendChild(ratioContainer);

    return editKeysNav
  }