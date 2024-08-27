import ScaleDegree from "./ScaleDegree.js";
import ScaleDegreeModifier from "./ScaleDegreeModifier.js";

export default class Scale {
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

// testing
function getModifiersForScale(scaleId) {
    const modifier0 = new ScaleDegreeModifier(5,5,4,0);
    const modifier1 = new ScaleDegreeModifier(0,0,0,20);
    const modifier2 = new ScaleDegreeModifier(9,7,4,0);
    const mockedResponse = {
        "ok": 1,
        "documents": [
            // modifier0,
            // modifier1,
            // modifier2
        ]
    };
    return mockedResponse;
}