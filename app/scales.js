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
    scaleDegrees() { //we're going to want to
        let scaleDegrees = [new scaleDegree()];
        while (scaleDegrees.length < this.length) {
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
     * @param {Float} period size of octave interval //they aren't rly params tho since they're just class instance variables?
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
        this.modifiers = modifiers; // we'll want to add a DB call for the modifiers, but this is a stubb for testing
    };
}

class Keyboard {
    constructor(scale) {
        this.scale = scale
        this.cutoffFrequency = 20_000
    }

    // private functions
    frequencyScaffold() {
        const scaleDegrees = this.scale.scaleDegrees() // initializes the array so that we can map onto it
        let scaffold = scaleDegrees.map(x => x.frequency); // build the base "layer" of the scaffold using the scaleDegrees freqs
        for (let scaleIndex = 0; scaleIndex < this.scale.length; scaleIndex++) { // outer loop iterates once for each scale degree
            // set fresh cursor for each scaleDegree
            let keyboardIndex = 1;

            while (true) { // inner loop iterates once for each "octave"
                // this uses both cursors to locate the correct position in our pseudo 2d array
                const position = (keyboardIndex * this.scale.length) + scaleIndex
                // calculates the current frequency by referencing the last frequency we added to the scaffold
                const prevPosition = position - this.scale.length
                const prevFrequency = scaffold[prevPosition]
                // finds the new frequency by multiplying the previous frequency by the period
                let frequency = this.scale.period * prevFrequency

                // return frequency to stop key generation at a reasonable limit
                if (frequency >= this.cutoffFrequency) break;

                // pushes the frequency into the array
                scaffold[position] = frequency
                keyboardIndex++
            }
        }
        return scaffold;
    }

    keys() {
        let scaffold = this.frequencyScaffold()
        // scaffold.map() //TODO
    }
}

class Key {
    constructor(frequency) {
        this.frequency = frequency // this is mostly for the ui
        this.sustain = false
    }

    play() {
        this.#toggleSustain();
        this.#callSynth(this.frequency)
    }

    #toggleSustain() {
        this.sustain = !this.sustain
    }

    // def memoize this
    #callSynth(frequency) {
        `synth frequency is ${frequency} sustain is ${this.sustain}`
    }
}

class Modifier {
    constructor(scaleDegree = 0, numerator = 2,denominator = 1, detuneByCents = 0) {
        this.scaleDegree = scaleDegree
        this.ratio = numerator / denominator
        this.detuneByCents = detuneByCents
    }
}

/**
 *******************************
 * TODO FUNCTION LIST
 *******************************
 * **/
//TODO: create isUser to validate if signed in or not
function isUser() {
}

//TODO: create function and attach method to each scaleDegree
function activateTone() {
    // if dom object is is clicked, activate tone
}
//TODO: should individual tone sustain be a method?
function pitchIsSustained() {
    //
}

/**
 *******************************
 * TESTING
 *******************************
 * **/

const scaleTest = new Scale
scaleTest.name = `plups test scale`

console.log(scaleTest.scaleDegrees())
const keyboardTest = new Keyboard(scaleTest)
const scaffold = keyboardTest.frequencyScaffold(scaleTest)
console.log(scaffold)