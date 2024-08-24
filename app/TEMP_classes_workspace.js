class Scale {
    constructor(
        author,
        name,
        startingFreq = 240,
        length = 12,
        period = 2,
        isPreset = false,
    ) {
        this.id = "stubbedScaleId"
        this.name = name;
        this.author = author;
        this.startingFreq = startingFreq;
        this.length = length; // num. of scale degrees
        this.period = period; // size of octave interval - how much space is covered in the scale before it repeats.
        this.isPreset = isPreset;
    };
        /**
         * @method scaleDegrees
         * @return {Array} returns an array of scale degree objects
         * **/
        scaleDegrees() {
            let scaleDegrees = [new scaleDegree()];
            while (scaleDegrees.length <= this.length) {
                const previousScaleDegree = scaleDegrees.slice(-1)
                const nextFrequency = previousScaleDegree[0].frequency * this.#stepSizeMultiplier()

                 // TODO: apply modifiers

                 scaleDegrees.push(new scaleDegree(nextFrequency, this.modifiers));
            };
            return scaleDegrees;
        };

        // private methods

        modifiers() {
            // use the populate() method to get all of the associated modifiers
            // this is a stubbed method for testing
            return getModifiersForScale(this.id);
        };

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

class scaleDegree {
    constructor(frequency = 240, modifiers = {}) {
        this.frequency = frequency;
        this.modifiers = modifiers;
    };
}

class Keyboard {
    constructor(scale) {
        this.scale = scale;
        this.cutoffFrequency = 20_000;
    }

    // private functions
    #buildKeyboardFrequencies() {
        const scaleDegrees = this.scale.scaleDegrees(); // initializes 1st period of scaleDegrees objects
        let scaffold = scaleDegrees.map(scaleDegree => scaleDegree.frequency); // creates base "layer" via scaleDegrees freq.'s 

        for (let scaleIndex = 0; scaleIndex < this.scale.length; scaleIndex++) { 
            let keyboardIndex = 1;  // sets fresh cursor for each scaleDegree

            while (true) { // inner loop iterates once for each "octave"
                
                const position = (keyboardIndex * this.scale.length) + scaleIndex; // uses keyboard & scale index to locate the correct position in 2d array
               
                // calculates frequency by referencing the last frequency we added to the scaffold
                const prevPosition = position - this.scale.length; 
                const prevFrequency = scaffold[prevPosition];

                let frequency = this.scale.period * prevFrequency; // finds new frequency by multiplying the previous frequency by the period (octave interval)

                if (frequency >= this.cutoffFrequency) break;
                
                scaffold[position] = frequency; // pushes frequency into array
                keyboardIndex++;
            }
        };
        return scaffold;
    };

    keys() {
        const keysFreqArr = this.#buildKeyboardFrequencies();
        console.log(keysFreqArr);
        // keysFreqArr.map(); //TODO
    };
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
class scaleDegreeModifier {
    constructor(scaleDegreePosition = 0, ratioNumerator = 2, ratioDenominator = 1, detuneByCents = 0) {
        this.scaleDegreePosition = scaleDegree
        this.ratioNumerator = ratioNumerator
        this.ratioDenominator = ratioDenominator
        this.detuneByCents = detuneByCents
    }
};

function getModifiersForScale(scaleId) {
    const modifier0 = new scaleDegreeModifier({
        "_id": 'foo',
        "scaleId": scaleId,
        "ratioDenominator": 4,
        "ratioNumerator": 5,
        "detuneByCents": 0,
        "scaleDegreePosition": 5
    });
    const modifier1 = new scaleDegreeModifier({
        "_id": 'foo',
        "scaleId": scaleId,
        "ratioDenominator": 4,
        "ratioNumerator": 7,
        "detuneByCents": 0,
        "scaleDegreePosition": 10
    });
    const modifier2 = new  scaleDegreeModifier({
        "_id": 'foo',
        "scale_id": scaleId,
        "ratioDenominator": 0,
        "ratioNumerator": 0,
        "detuneByCents": 20,
        "scaleDegreePosition": 5
    });

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

// const generateScaleBtn = document.getElementById('create-scale-btn');
// const author = document.getElementById('scale-author-input')
// const scaleName = document.getElementById('scale-name-input')
// const startingFreq = document.getElementById('starting-frequency-input')
// const numOfScaleDeg = document.getElementById('num-of-scale-degrees-input')

//   const createScale = async function () {
//     const scaleData = {
//         name: scaleName.value,
//         author: author.value,
//         startingFreq: startingFreq.value,
//         numOfScaleDeg: numOfScaleDeg.value
//     }

//     // await fetch(`http://localhost:8080/api/scale`, {
//     //     method: "POST",
//     //     headers: {
//     //       "content-type": "application/json"
//     //     },
//     //     body: JSON.stringify(scaleData)
//     //   }).then(resp => resp.json());

//     console.log('click works')
//     const newScale = new Scale(author.value, scaleName.value);
//     const newKeyboard = new Keyboard(newScale)
//     console.log(newKeyboard)
//     console.log('newScale.modifiers call: ', newScale.modifiers())
//     console.log('getModifiersForScale call: ',getModifiersForScale(newScale.id))
//     console.log('newScale.id call: ', newScale.id)
//   }

//   generateScaleBtn.addEventListener('click', createScale )