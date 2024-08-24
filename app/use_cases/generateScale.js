import Scale from "../classes/Scale.js"
import Keyboard from "../classes/Keyboard.js"
import ScaleDegree from "../classes/ScaleDegree.js"
import ScaleDegreeModifier from "../classes/ScaleDegreeModifier.js" 

const generateScaleBtn = document.getElementById('create-scale-btn');
const author = document.getElementById('scale-author-input')
const scaleName = document.getElementById('scale-name-input')
const startingFreq = document.getElementById('starting-frequency-input')
const numOfScaleDeg = document.getElementById('num-of-scale-degrees-input')

  const createScale = async function () {
    const scaleData = {
      scaleName: scaleName.value,
      author: author.value,
      startingFreq: startingFreq.value,
      numOfScaleDeg: numOfScaleDeg.value
  }
    // await fetch(`http://localhost:8080/api/scale`, {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json"
    //     },
    //     body: JSON.stringify(scaleData)
    //   }).then(resp => resp.json());

    //todo: send same data to fetch & newScale; right now i am writing it twice since it isn't getting picked up from scaleData
    const newScale = new Scale(author.value, scaleName.value, startingFreq.value, numOfScaleDeg.value);
    const newKeyboard = new Keyboard(newScale)
    // console.log(newScale)
    // console.log(new Scale({scaleData})) // returns stubbed data instead
    // console.log(newKeyboard)


    newKeyboard.keys().map((key, index) => {
      createKeyElement(key, index)
    })
    // console.log(newKeyboard.modifiers())
    // console.log('newScale.modifiers call: ', newScale.modifiers())
    // console.log('getModifiersForScale call: ',getModifiersForScale(newScale.id))
    // console.log('newScale.id call: ', newScale.id)
  }

  generateScaleBtn.addEventListener('click', createScale )


  //todo: upon generating: add "delete scale" button ... and option for generating a second scale on screen

  // testing functionality 
  function createKeyElement (key, index ) {
    const btn = document.createElement('button');

    btn.className = "scale-key";
    btn.id = `scale-key-${index}`
    // btn.setAttribute(`key-position-${position}`) // todo: add scale position; should it be an attribute or additional class? google use case
    btn.innerHTML = `${key}`

    const mainContainer = document.getElementById('main')
  
    mainContainer.appendChild(btn)
  }
  