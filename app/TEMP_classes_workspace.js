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
        // TODO populate call for modifiers
        const indexedModifiers = this.indexedModifiersArray()
        let scaleDegrees = [new ScaleDegree(this.startingFreq, (indexedModifiers[0] || {}))];
        while (scaleDegrees.length <= this.length) {
            const previousScaleDegree = scaleDegrees.slice(-1)
            const nextFrequency = previousScaleDegree[0].frequency * this.#stepSizeMultiplier()
            scaleDegrees.push(new ScaleDegree(nextFrequency, indexedModifiers[scaleDegrees.length]));
        };
        return scaleDegrees;
    };

    // private methods

    indexedModifiersArray() {
        // TODO call to mongo db for all scales with this scale's scale_id
        // this is a stubbed method for testing
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
        this.scaleDegreePosition = scaleDegreePosition
        this.ratioNumerator = ratioNumerator
        this.ratioDenominator = ratioDenominator
        this.detuneByCents = detuneByCents
    }
};

function getModifiersForScale(scaleId) {
    const modifier0 = new scaleDegreeModifier(5,5,4,0);
    const modifier1 = new scaleDegreeModifier(0,0,0,20);
    const modifier2 = new  scaleDegreeModifier(9,7,4,0);
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

const newScale = new Scale();
newScale.name = 'plups scale'
// const keyboardWithScaleInjected = new Keyboard(newScale);
// console.log('Keyboard w/ Scale Injected: ', keyboardWithScaleInjected)
// keyboardWithScaleInjected.keys()
// const keyboardTest = new Keyboard(newScale)
// console.log(newScale.modifiers())
// console.log(getModifiersForScale(newScale.id))
// console.log(newScale.indexedModifiersArray())
console.log(newScale.scaleDegrees())