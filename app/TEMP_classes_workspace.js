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
        let frequency = this.inputFrequency;
        const ratio = this.#ratio();
        frequency *= ratio; // if no ratio is provided this will be 1
        frequency *= Math.pow(2, this.modifier.detuneByCents/1200); // if no detune is provided this will be 1
        return frequency;
    };

    #ratio(){
        if (this.modifier.ratioDenominator === 0) return 1;
        const ratio = this.modifier.ratioNumerator / this.modifier.ratioDenominator
        return (ratio || 1);
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
            // calculation
            const currentPeriod = Math.floor(i/this.scale.length)
            const periodMultiplier = currentPeriod * this.scale.period || 1; // making sure we don't zero out the first row
            const baseFrequency = scaleDegrees[(i % this.scale.length)].frequency
            const frequency = baseFrequency * periodMultiplier

            // return clause
            if (frequency >= this.cutoffFrequency) break;

            // assignment
            scaffold[i] = frequency
            i++;
        }
        return scaffold;
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
        "documents": []
        //     modifier0,
        //     modifier1,
        //     modifier2
        // ]
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
const keyboardWithScaleInjected = new Keyboard(newScale);
// console.log('Keyboard w/ Scale Injected: ', keyboardWithScaleInjected)
console.log(keyboardWithScaleInjected.keys())
// const keyboardTest = new Keyboard(newScale)
// console.log(newScale.scaleDegrees())
// console.log(keyboardWithScaleInjected.buildKeyboardFrequencies())