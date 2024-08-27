class Scale {
    constructor(
        isPreset = false,
        name,
        startingFreq = 240,
        author,
        length = 12,
        period = 2,
    ) {
        this.id = "stubbedScaleId"
        this.isPreset = isPreset;
        this.name = name;
        this.startingFreq = startingFreq;
        this.author = author;
        this.length = length; // num. of scale degrees
        this.period = period; // size of octave interval - how much space is covered in the scale before it repeats.
    };
    /**
     * @method scaleDegrees
     * @return {Array} returns an array of scale degree objects
     * **/
    scaleDegrees() {
        const indexedModifiers = this.#indexedModifiersArray()
        let scaleDegrees = [new ScaleDegree(this.startingFreq, (indexedModifiers[0] || new ScaleDegreeModifier()), this.startingFreq)];
        while (scaleDegrees.length < this.length) {
            const previousScaleDegree = scaleDegrees.slice(-1)[0]
            const nextFrequency = (previousScaleDegree.inputFrequency) * this.#stepSizeMultiplier()
            const modifier = indexedModifiers[scaleDegrees.length] || new ScaleDegreeModifier()
            scaleDegrees.push(new ScaleDegree(nextFrequency, modifier, this.startingFreq));
        };
        return scaleDegrees;
    };

    // private methods

    #indexedModifiersArray() {
        // instead of this getModifiers call we'll do a `populate()` for all the associated modifiers
        let modifiers = getModifiersForScale(this.id).documents;

        let acc = []
        for(let i = 0; i < modifiers.length; i++){
            const current = modifiers[i]
            acc[(current.scaleDegreePosition)] = current;
        }
        return acc;
    }

    /**
     * @method stepSizeMultiplier
     *
     * @param {Float} period size of octave interval
     * @param {Int} length num of scale degrees
     *
     * @return {Float} frequency of each scale degree
     */
    #stepSizeMultiplier() {
        return Math.pow(this.period, 1/this.length)
    };
};

class ScaleDegree {
    constructor(inputFrequency = 0, modifier = {}, startingFreq = 240) {
        this.inputFrequency = inputFrequency
        this.modifier = modifier
        this.startingFreq = startingFreq
        this.frequency = this.#frequency()
    }
    #frequency() {
        let frequency = this.inputFrequency
        if (this.modifier.ratioNumerator > 0 && this.modifier.ratioDenominator > 0) {
            frequency = this.#ratio(this.startingFreq)
        }
        return frequency *= Math.pow(2, this.modifier.detuneByCents/1200); // if no detune is provided this will be 1
    };

    #ratio(startingFreq){
        return (startingFreq * this.modifier.ratioNumerator) / this.modifier.ratioDenominator;
    };
};

class Keyboard {
    constructor(scale) {
        this.scale = scale;
        this.cutoffFrequency = 20_000;
    }
    keys() {
        let scaffold = this.#buildKeyboardFrequencies()
        return scaffold.map(frequency => new Key(frequency));
    };

    // private methods
    #buildKeyboardFrequencies() {
        const scaleDegrees = this.scale.scaleDegrees();
        let scaffold = [];
        let i = 0;
        while (true){
            const currentPeriod = Math.floor(i/this.scale.length)
            const periodMultiplier = Math.pow(this.scale.period,currentPeriod);
            const baseFrequency = scaleDegrees[(i % this.scale.length)].frequency
            const frequency = baseFrequency * periodMultiplier

            if (frequency >= this.cutoffFrequency) return scaffold;

            scaffold[i] = frequency
            i++;
        }
    }
};

//todo: short description on class
class Key {
    constructor(frequency) {
        this.frequency = frequency; // this is mostly for the ui
        this.sustain = false;
    };

    play() {
        this.#toggleSustain();
        this.#callSynth(this.frequency);
    };

    #toggleSustain() {
        this.sustain = !this.sustain;
    };

    // def memoize this
    #callSynth(frequency) {
       console.log( `synth frequency is ${frequency} sustain is ${this.sustain}`)
    };
};

//todo: short description on class; 
class ScaleDegreeModifier {
    constructor(scaleDegreePosition = 0, ratioNumerator = 0, ratioDenominator = 0, detuneByCents = 0) {
        this.scaleDegreePosition = scaleDegreePosition
        this.ratioNumerator = ratioNumerator
        this.ratioDenominator = ratioDenominator
        this.detuneByCents = detuneByCents
    }
};

function getModifiersForScale(scaleId) {
    const modifier0 = new ScaleDegreeModifier(5,5,4,0);
    const modifier1 = new ScaleDegreeModifier(0,0,0,20);
    const modifier2 = new ScaleDegreeModifier(9,7,4,0);
    const mockedResponse = {
        "ok": 1,
        "documents": [
            modifier0,
            modifier1,
            modifier2
        ]
    };
    return mockedResponse;
}

/**
*******************************
* TODO FUNCTION LIST
*******************************
* **/
//TODO: create isUser to validate if signed in or not
function isUser() {
};

//TODO: create function and attach method to each scaleDegree
function activateTone() {
    // if dom object is is clicked, activate tone 
};

/**
*******************************
* TESTING 
*******************************
* **/

function createScaleDegreeModifiers(arr) {
    let newArr = [];
    arr.map(item => {
       let newModifier = new ScaleDegreeModifier();
       newModifier.scaleDegreePosition = arr.indexOf(item);
       newArr.push(newModifier);
    });
    return newArr;
};

const newScale = new Scale();
newScale.name = 'plups scale'
const keyboardWithScaleInjected = new Keyboard(newScale).keys();
const scaleDegreeModifiers = createScaleDegreeModifiers(keyboardWithScaleInjected)
// console.log(scaleDegreeModifiers)


// console.log('Keyboard w/ Scale Injected: ', keyboardWithScaleInjected)
// console.log(keyboardWithScaleInjected.keys())
// const keyboardTest = new Keyboard(newScale)
// console.log(newScale.scaleDegrees())
// console.log(keyboardWithScaleInjected.buildKeyboardFrequencies())


const generateScaleBtn = document.getElementById('generate-scale-btn');
const author = document.getElementById('scale-author-input')
const scaleName = document.getElementById('scale-name-input')
const startingFreq = document.getElementById('starting-frequency-input')
const lengthOfScale = document.getElementById('length-of-scale-input')


  //todo: upon generating a scale, add "delete scale" button ... and option for generating a second scale on screen


  const appendKeyboard = async function () {
    const scaleData = {
      scaleName: scaleName.value,
      author: author.value,
      startingFreq: startingFreq.value,
      lengthOfScale: lengthOfScale.value
  }
    // await fetch(`http://localhost:8080/api/scale`, {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json"
    //     },
    //     body: JSON.stringify(scaleData)
    //   }).then(resp => resp.json());

    // todo: send same data to fetch & newScale; right now i am writing it twice since it isn't getting picked up from scaleData
    // todo: show only 2 octaves at first.
    const newScale = new Scale(author.value, scaleName.value, startingFreq.value, lengthOfScale.value);
    const newKeyboard = new Keyboard(newScale)
    
    const keyboardContainer = createKeyboardContainer()
    const parentContainer = document.getElementById('keyboard-parent-container')
   

    newKeyboard.keys().map((key, index) => {
        createKeyElement(key, index, keyboardContainer)
    })

    parentContainer.appendChild(keyboardContainer)

  }

  generateScaleBtn.addEventListener('click', appendKeyboard )

  function createKeyboardContainer() {
    //grab num of keyboards on page to create index for ID name
    const keyboards = document.getElementsByClassName("keyboard-container").length
    const div = Object.assign(document.createElement('div'), 
        { className: 'keyboard-container' }, 
        { id: `keyboard${keyboards+1}`}
    );
    return div
  }

  function createKeyElement (key, index, container ) {
    // only show first 2 octaves on creation 
    // todo: generate length of octave based on users input
    const mock_octave = 24
    
    const btn = Object.assign(document.createElement('button'), 
        { className: `keyboard-key ${ index < mock_octave ? 'keyboard-key-show' : 'keyboard-key-hidden'}` }, 
        { id: `keyboard-key${index}` }, 
        { name: `${key.frequency}` }, 
        { innerHTML: `${roundFreq(key.frequency, 3)}` },
        { ariaLabel: 'Button to play frequency' }
        // { setAttribute: `key-position-${position}` } // todo: add scale position; should it be an attribute or additional class? google use case
    );
     //todo: add hide/show attribute to show only 1-3 octaves on load, additional or minus octaves when an "+" or "-" is clicked
    container.appendChild(btn);
  }

    // using this for the innerHTML of the btn... we can set the actual frequency (full float) in an attribute and allow an advances setting to show if desired...
  function roundFreq(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}
