class Scale {
    constructor(
        isPreset = false,
        name,
        startingFreq = 240,
        author,
        length = 12,
        period = 2,
        modifiers = {}
    ) {
        this.isPreset = isPreset;
        this.name = name;
        this.startingFreq = startingFreq;
        this.author = author;
        this.length = length; // num. of scale degrees
        this.period = period; // size of octave interval - how much space is covered in the scale before it repeats.
        this.modifiers = modifiers;
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
                scaleDegrees.push(new scaleDegree(nextFrequency, this.modifiers));
            };
            return scaleDegrees;
        };

        // private methods
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
class Modifier {
    constructor(scaleDegree = 0, numerator = 2, denominator = 1, detuneByCents = 0) {
        this.scaleDegree = scaleDegree;
        this.ratio = numerator / denominator;
        this.detuneByCents = detuneByCents;
    };
};

function buildFrequencyScaffold(scale) {

};

function buildKeys(buildKeyboardFrequencies) {

};

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
const keyboardTest = new Keyboard(newScale)
keyboardTest.keys()