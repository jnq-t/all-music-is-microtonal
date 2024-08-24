import ScaleDegree from "./ScaleDegree.js";
// import {ScaleDegreeModifier} from "./ScaleDegreeModifier.js";

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
        this.author = author;
        this.name = name;
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
        let scaleDegrees = [new ScaleDegree()];
        // populate call for modifiers
        while (scaleDegrees.length <= this.length) {
            const previousScaleDegree = scaleDegrees.slice(-1)
            const nextFrequency = previousScaleDegree[0].frequency * this.#stepSizeMultiplier()
            scaleDegrees.push(new ScaleDegree(nextFrequency, this.modifiers));
        };
        return scaleDegrees;
    };

    // private methods

    #modifiers() {
        // TODO call to mongo db for all scales with this scale's scale_id
        // this is a stubbed method for testing
        getModifiersForScale(this.id)
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

export default Scale