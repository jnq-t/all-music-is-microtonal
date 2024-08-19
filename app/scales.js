/** 
 * 
 * @method  createScale
 * @param  {String} scaleName name of scale
 * @param  {Float} startingFreq first note in the scale 
 * @param  {String} [scaleAuthor] who created the scale
 * @return {Object} basic scale generator with associated scale degrees 
 *
 * **/

function createScale(scaleName, startingFreq, scaleAuthor) {
    return {
        scaleName: scaleName,
        scaleAuthor: scaleAuthor ? scaleAuthor : "",
        startingFreq: 0,
        scaleDegrees: createScaleDegrees(startingFreq),
        sustainMode: false,
        isPreset: false,
        periodRatio: {numerator: 2, denominator: 1}
    }
}

/*******************************
/** SCALE DEGREE FUNCTIONS
/*******************************
/**
 * @description Automatically generates and returns all scale degrees upon scale initialization 
 * 
 * @method createScaleDegrees
 * @param {Float} freq = frequency of each scale degree; begins with starting frequency input by user
 * @param {Function} scaleDegreeObject creates the object for each scale degree
 * @param {Function} stepSizeMultiplier math for finding the freq. of each scale degree
 * @return {Array} returns an array of all Scale Degree Objects
 * 
 * **/
function createScaleDegrees(freq, scaleDegreeObject, stepSizeMultiplier) {
    const freqCutoff = 20_000; // highest freq. of human hearing: 20,000 HZ
    let pitchArray = [];

    while (freq <= freqCutoff) {
        pitchArray.push(scaleDegreeObject(freq));
        freq *= stepSizeMultiplier;
    };
    
    return pitchArray;
}

/** 
 * 
 * @method scaleDegreeObject
 * @param {Float} freq = frequency of each the scale degree
 * @return {Object} an object for each scale degree in the generated scale
 * 
 * **/
function scaleDegreeObject(freq) {
    // TODO: some type of index or id to indicate what pitch in the scale this is
    // august 19
        // scaleDegreePosition = where a given scale degree is in relative scale
        // to find out what the scaleDegreePosition of a given scaleDegree object is we take it's position in the index mod the noOfScale degrees
        // scale
        //wondering about this
        // scale degrees = {1: [sd, sd2, sd3], 2: [sd1,sd2,sd3]}
    return  { 
        frequency: freq,
        sustain: false,
        activateTone: false, // TODO: create method using tone.js; ability to turn sustain on and off
        modifiers: {
            ratio: { 
                    numerator: 1, 
                    denominator: 1 
                },
            detune: 0
        }
    }
}

/** 
 * 
 * @method stepSizeMultiplier
 * @param {Float} periodFloat the octave interval - how much space is covered in the scale before it repeats.
 * @param {Int} numScaleDegrees user input for num. of scale degrees in each octave
 * @return {Float} returns the frequency of each scale degree
 * 
 * **/
function stepSizeMultiplier(periodFloat, numScaleDegrees) {
    return Math.pow(periodFloat, 1/numScaleDegrees)
}


//TODO: create isUser to validate if signed in or not
function isUser() {
}

//TODO: create function and attach method to each scaleDegree
function activateTone() {
    // if dom object is is clicked, activate tone 
}
//TODO: should individual tone sustain be a method?
function pitchIsSustained() {
    // 
}