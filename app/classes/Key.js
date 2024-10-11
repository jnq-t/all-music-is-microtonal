export default class Key {
    constructor(frequency) {
        this.frequency = frequency; // this is mostly for the ui
        this.sustainMode = false;
        this.playingSustain = false;
        this.synth
    };

    play() {
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
       const now = Tone.now();

        if (!this.synth){
            this.synth = new Tone.Synth().toDestination();
        }

        // SUSTAIN NOTE
        if (this.sustainMode) {
            
            this.togglePlayingSustain()
            
            // checks if note is playing
            if(this.playingSustain) {
                this.synth.triggerAttack(frequency); // sustain note
            } else {
                console.log("turning off key sustain")
                this.synth.triggerRelease() // release note
            }
            
            //changes color of btn border to indicate whether or not the note is playing
            // event.target.classList.toggle('note-is-sustaining') //todo: add visual toggle for when sustained note is playing

        } else  {
            this.synth.triggerAttack(frequency, now);  // trigger the attack immediately
            this.synth.triggerRelease(now + 0.2); //todo: make release time a variable the user can change
        }
    };
};
