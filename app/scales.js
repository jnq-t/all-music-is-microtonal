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
        this.isPreset = isPreset
        this.name = name
        this.startingFreq = startingFreq
        this.author = author
        this.length = length // num. of scale degrees
        this.period = period // size of octave interval - how much space is covered in the scale before it repeats.
        this.modifiers = modifiers
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

CUTOFF_FREQUENCY = 20_000; // end of human hearing

class scaleDegree {
    constructor(frequency = 240, modifiers = {}) {
        this.frequency = frequency
        this.modifiers = modifiers
    };
}

function buildKeyboard(scale) {
    const scaleDegrees = scale.scaleDegrees();
    // TODO I'M MAKING THIS RN BUT WANTED TO SEND YOU EVERYTHING ELSE
};


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

const test = new Scale
test.name = `plups test scale`

console.log(test.scaleDegrees())