

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

class Keyboard extends Scale {
    constructor() {
        super(Scale)
        this.cutoffFrequency = 20_000;
    };

    // private functions
    //todo: write out comment on function
    #buildKeyboardFrequencies() {
        let keyboard = [];
       
        for (let scaleIndex = 0; scaleIndex <= this.length; scaleIndex++) {
            const scaleDegrees = this.scaleDegrees();
            const baseFrequency = scaleDegrees[scaleIndex].frequency;
            // set fresh cursor for each scaleDegree
            let keyboardIndex = 0;

            while (true) {
                const position = (keyboardIndex * this.length) + scaleIndex;
                const periodCoefficient = keyboardIndex + 1 ;
                let frequency = periodCoefficient * this.period * baseFrequency;

                if (frequency >= this.cutoffFrequency) break;

                keyboard[position] = frequency;
                keyboardIndex++;
            };
        };
        return keyboard;
    }
    //todo: write out comment on function
    keys() {
        let keyboard = this.#buildKeyboardFrequencies();
        console.log(keyboard)
        keyboard.map(); // what is this supposed to do? currently is an undefined function
    };
}

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
        `synth frequency is ${frequency} sustain is ${this.sustain}`
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
* TESTING -- jesse don't look.. it's ugly
*******************************
* **/

const keyboardTest = new Keyboard
keyboardTest.name = 'plups new scale'
const createKeyboard = keyboardTest.keys()
console.log(keyboardTest)
// console.log(createKeyboard)