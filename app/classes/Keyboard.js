import Key from "./Key.js";
import ScaleDegree from "./ScaleDegree.js";

export default class Keyboard {
    constructor(scale) {
        this.scale = scale;
        this.cutoffFrequency = 20_000;
        this.keys_memo
    }
    
    keys() {
        if (!this.keys_memo) {
            let scaffold = this.#buildKeyboardFrequencies()
            let scaleDegrees = this.scale.scaleDegrees()
            this.keys_memo = scaffold.map((frequency,index) => new Key(frequency,scaleDegrees[index]))
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
