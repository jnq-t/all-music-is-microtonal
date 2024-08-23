import {ScaleDegree} from "./ScaleDegree";
import {ScaleDegreeModifier} from "./ScaleDegreeModifier";

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
        let scaleDegrees = [new ScaleDegree()];
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

export class Scale { /* … */ }