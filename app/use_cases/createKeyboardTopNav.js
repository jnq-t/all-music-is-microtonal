import createEle from "../utilities/createDomElement.js"

 export default function createKeyboardTopNav () {
    const topNav = Object.assign(document.createElement('nav'), 
      {className: `keyboard-top-nav`},
    )
    const ul = Object.assign(document.createElement('ul'), 
    {className: `keyboard-top-nav-items`},
    {id: `keyboard-top-nav-items`}
    )

    ul.appendChild( createEle('li', 'keyboard-top-nav-list-item nav-item', 'Scale Name') )
    ul.appendChild( createEle('li', 'keyboard-top-nav-list-item nav-item', 'Starting Frequency') )
    ul.appendChild( createEle('li', 'keyboard-top-nav-list-item nav-item', 'Octave Length') )
    ul.appendChild( createEle('li', 'keyboard-top-nav-list-item nav-item', 'Octave Span') )

    topNav.appendChild( hamburgerMenu() )
    topNav.appendChild(ul)
    return topNav
  }

  function hamburgerMenu() {
    const hamburgerIcon = createEle('div', `hamburger-icon`);
          hamburgerIcon.id = 'icon'
          hamburgerIcon.ariaLabel = 'Navigation menu toggle for keyboard'

    for (let i=1; i <= 3; i++) {
      const iconLine = createEle('div', `icon-line${i} icon-line`) 
      hamburgerIcon.appendChild( iconLine )
    };
    
    const icon1 = hamburgerIcon.children[0]
    const icon2 = hamburgerIcon.children[1]
    const icon3 = hamburgerIcon.children[2]
   
    hamburgerIcon.addEventListener('click', () => {
      const navItems = document.getElementById(`keyboard-top-nav-items`)
      icon1.classList.toggle('a');
      icon2.classList.toggle('c');
      icon3.classList.toggle('b');
      
    })
    return hamburgerIcon
  }


 

