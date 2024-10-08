export default class Key {
    constructor(frequency) {
        this.frequency = frequency; // this is mostly for the ui
        this.sustainMode = false;
        this.playingSustain = false;
    };

    play() {
        // this.#toggleSustain();
        this.#callSynth(this.frequency);
    };

    toggleSustain() {
        this.sustainMode = !this.sustainMode;
    };

    togglePlayingSustain() {
        this.playingSustain = !this.playingSustain;
    };

    // memoize this method: set result to variable in memory so you don't have to keep computing
   async #callSynth(frequency) {
        await Tone.start();

        const synth = new Tone.Synth().toDestination();
        const now = Tone.now();

        // SUSTAIN NOTE
        if (this.sustainMode) {
            
            this.togglePlayingSustain()
            
            // checks if note is playing
            if(this.playingSustain) {
                synth.triggerAttack(frequency); // sustain note
            } else {
                synth.triggerRelease() // release note
            }
            
            //changes color of btn border to indicate whether or not the note is playing
            // event.target.classList.toggle('note-is-sustaining') //todo: add visual toggle for when sustained note is playing

        } else  {
            synth.triggerAttack(frequency, now);  // trigger the attack immediately
            synth.triggerRelease(now + 0.2); //todo: make release time a variable the user can change
        }
    };
};
