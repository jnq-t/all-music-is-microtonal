export default class Key {
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

    // memoize this method: set result to variable in memory so you don't have to keep computing
    #callSynth(frequency) {
       console.log( `synth frequency is ${frequency} sustain is ${this.sustain}`)
    };
};
