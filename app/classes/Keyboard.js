import Key from "./Key.js";

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
        // console.log(keysFreqArr);
        return keysFreqArr
        // keysFreqArr.map(); //TODO
    };
};

export default Keyboard