import Key from "./Key.js";

export default class Keyboard {
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
            const currentPeriod = Math.floor(i/this.scale.length)
            const periodMultiplier = Math.pow(this.scale.period,currentPeriod);
            const baseFrequency = scaleDegrees[(i % this.scale.length)].frequency
            const frequency = baseFrequency * periodMultiplier

            if (frequency >= this.cutoffFrequency) return scaffold;

            scaffold[i] = frequency
            i++;
        }
    }
};
