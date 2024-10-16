export default class Key {
    constructor(frequency, scaleDegree) {
        this.frequency = frequency; // this is mostly for the ui
        this.sustainMode = false;
        this.playingSustain = false;
        this.scaleDegree = scaleDegree;
        this.synth;
    };

    play() {
        // console.log(this.modifier())
        this.#callSynth(this.frequency);
    };

    toggleSustain() {
        this.sustainMode = !this.sustainMode;
    };

    togglePlayingSustain() {
        this.playingSustain = !this.playingSustain;
    };

    modifier() {
        return this.scaleDegree.modifier
    }

    //private methods
   async #callSynth(frequency) {
       await Tone.start();
       const now = Tone.now();

        if (!this.synth){
            this.synth = new Tone.Synth().toDestination();
        }
        console.log('Key Class Sustain Mode: ',this.sustainMode)
        // SUSTAIN NOTE
        if (this.sustainMode) {
            
            this.togglePlayingSustain()
            // checks if note is playing
            if(this.playingSustain) {
                this.synth.triggerAttack(frequency); // sustain note
            } else {
                console.log("turning off key sustain")
                this.synth.triggerRelease() // release note
                // if you're changing it
                // this.synth.triggerAttack(frequency*2)
            }
            
            //changes color of btn border to indicate whether or not the note is playing
            // event.target.classList.toggle('note-is-sustaining') //todo: add visual toggle for when sustained note is playing

        } else  {
            this.synth.triggerAttack(frequency, now);  // trigger the attack immediately
            this.synth.triggerRelease(now + 0.2); //todo: make release time a variable the user can change
        }
    };
};
