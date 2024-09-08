import createEle from "../utilities/createDomElement.js"

/**
 * @method createKeyboardSideMenu creates side menu navigation for keyboard
 */
export default function createKeyboardSideMenu () {
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