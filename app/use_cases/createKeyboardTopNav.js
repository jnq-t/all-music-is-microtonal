import keyModifierOptions from "./keyModifierOptions.js"

/**
 * @method createKeyboardTopNav creates top menu navigation for keyboard
 */
export default function createKeyboardTopNav () {
  const topNav = Object.assign(document.createElement('nav'), // DOM nav container
    {className: 'keyboard-top-nav'},
    {id: 'keyboard-top-nav'}
  )
  topNav.appendChild(keyModifierOptions())
  // topNav.appendChild(scaleDataInputs) // appends item list to <nav/>
  
  return topNav
}
