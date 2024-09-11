import createEle from "../utilities/createBasicDomElement.js"

/**
 * @method createKeyboardTopNav creates top menu navigation for keyboard
 */
export default function createKeyboardTopNav () {
  const topNav = Object.assign(document.createElement('nav'), // DOM nav container
    {className: `keyboard-top-nav`},
  )
  
  // topNav.appendChild(scaleDataInputs) // appends item list to <nav/>
  
  return topNav
}
