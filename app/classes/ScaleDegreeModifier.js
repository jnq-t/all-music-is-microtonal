export default class ScaleDegreeModifier {
    constructor(/** scaleDegreePosition = 0, */ ratioNumerator = 2, ratioDenominator = 1, detuneByCents = 0) {
        // this.scaleDegreePosition = scaleDegree; // commented out because scaleDegreePosition was never being read
        this.ratioNumerator = ratioNumerator;
        this.ratioDenominator = ratioDenominator;
        this.detuneByCents = detuneByCents;
    };
};
