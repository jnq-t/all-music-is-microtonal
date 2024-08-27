class ScaleDegree {
    constructor(inputFrequency = 0, modifier = {}, startingFreq = 240) {
        this.inputFrequency = inputFrequency
        this.modifier = modifier
        this.startingFreq = startingFreq
        this.frequency = this.#frequency()
    }
    #frequency() {
        let frequency = this.inputFrequency
        if (this.modifier.ratioNumerator > 0 && this.modifier.ratioDenominator > 0) {
            frequency = this.#ratio(this.startingFreq)
        }
        return frequency *= Math.pow(2, this.modifier.detuneByCents/1200); // if no detune is provided this will be 1
    };

    #ratio(startingFreq){
        return (startingFreq * this.modifier.ratioNumerator) / this.modifier.ratioDenominator;
    };
};

export class ScaleDegree { /* … */ }