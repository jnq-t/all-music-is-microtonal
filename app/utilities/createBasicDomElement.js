export default function createEle (ele, eleClassName, eleText) {
    const element = Object.assign(document.createElement(ele), 
      {className: eleClassName},
      {innerText: eleText ? eleText : ''}
    )
    return element
  }