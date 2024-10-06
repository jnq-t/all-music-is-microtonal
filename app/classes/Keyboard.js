import Key from "./Key.js";
import ScaleDegree from "./ScaleDegree.js";

export default class Keyboard {
    constructor(scale) {
        this.scale = scale;
        this.cutoffFrequency = 20_000;
        this.keys_memo = []
    }
    
    keys() {
        if (this.keys_memo.length === 0) {
            let scaffold = this.#buildKeyboardFrequencies()
            this.keys_memo.push(scaffold.map(frequency => new Key(frequency)))
        }
        return this.keys_memo
    };

    findKey(index){
        return this.keys()[index]
    }

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
            // console.log(scaleDegrees[(i % this.scale.length)])
            i++;
        }
    }
};
