import topNav from "./createKeyboardTopNav.js"

/**
 * @method createKeyboardContainer creates parent <div/> for keyboard
 */
export default function createKeyboardContainer(lengthOfScale) {
    const keyboards = document.getElementsByClassName("keyboard-container").length;  //grab num of keyboards on page to create index for ID name
    const div = Object.assign(document.createElement('div'), 
        { className: 'keyboard-container' }, 
        { id: `keyboard${keyboards+1}`},
    );

    div.appendChild( topNav(lengthOfScale) )
    
    return div;
  };