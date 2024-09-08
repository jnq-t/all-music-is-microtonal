import createEle from "../utilities/createDomElement.js"

//todo: refactor code

/**
 * @method createKeyboardTopNav creates top menu navigation for keyboard
 */
 export default function createKeyboardTopNav () {
    const topNav = Object.assign(document.createElement('nav'), // DOM nav container
      {className: `keyboard-top-nav`},
    )
    
    topNav.appendChild( hamburgerMenu() ) // appends hamburgerMenu to <nav/>
    topNav.appendChild(navList()) // appends item list to <nav/>
    
    return topNav
  }

  /**
   * @method hamburgerMenu creates hamburger style nav btn
   */
  function hamburgerMenu() {
    const hamburgerIcon = createEle('div', `hamburger-icon`);
          hamburgerIcon.id = 'icon'
          hamburgerIcon.ariaLabel = 'Navigation menu toggle for keyboard'

    for (let i=1; i <= 3; i++) {
      const iconLine = createEle('div', `icon-line${i} icon-line`) 
      hamburgerIcon.appendChild( iconLine )
    };

    hamburgerIcon.addEventListener('click', () => {
      const navItems = document.getElementById(`keyboard-top-nav-items`) //todo: add functionality to hide/show nav items
     
      hamburgerIcon.children[0].classList.toggle('a');
      hamburgerIcon.children[1].classList.toggle('c');
      hamburgerIcon.children[2].classList.toggle('b');
    })

    return hamburgerIcon
  }
 
  // todo: build out and apply functionality 
  /**
   * @method navList creates unordered list for <nav/>
   */
  function navList() {
    const ul = Object.assign(document.createElement('ul'), // DOM unordered list
      {className: `keyboard-top-nav-items`},
      {id: `keyboard-top-nav-items`}
    )

    // DOM nav items
    ul.appendChild( createEle('li', 'keyboard-top-nav-list-item nav-item', 'Scale Name') )
    ul.appendChild( createEle('li', 'keyboard-top-nav-list-item nav-item', 'Starting Frequency') )
    ul.appendChild( createEle('li', 'keyboard-top-nav-list-item nav-item', 'Octave Length') )
    ul.appendChild( createEle('li', 'keyboard-top-nav-list-item nav-item', 'Octave Span') )

    return ul
  }


