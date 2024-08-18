/** CODE COMMENTS -  BEST PRACTICES
 *
 * @method name of function
 * @param parameters/arguments accepted, example: {Type} name Description
 *                        optional params example: {Type} [name] Description 
 * @return what is returned from function, example: {Type} Description of data returned
 * 
 * @example [optional] add example if it will prove useful in clarifying the method
 * 
 * **/

// TODO: create isUser to validate if signed in or not
/** 
 *
 * @method
 * @param
 * @return
 * 
 * **/


const createScaleBtn = document.getElementById('create-scale-btn');


//TODO: function list 
// function findOrInitializeScale () { findOrInitializeScale } (GET scale)
//  	return Scale 
//


//TODO: should scale be a constructor??
//TODO: figure out what type of polymorphism should be used for our case?
/** 
 * TODO: add short definition
 * @method  ScaleConstructor
 * @param  {String} scaleName name of scale
 * @param  {Float} startingFreq first note in the scale 
 * @param  {String} [scaleAuthor] who created the scale
 * @return {Object} basic scale generator with associated scale degrees 
 * 
 * @example var scale1 = new ScaleConstructor('scale1', 240)
    *          returns
    *          {
    *              scaleName: 'scale1',
    *              scaleAuthor: '', 
    *              startingFreq: 240,
    *              scaleDegrees: Array(int), 
    *              sustainMode: false,
    *              isPreset: false,
    *              periodRation: {...},
    *          }
 * **/

function ScaleConstructor (scaleName, startingFreq, scaleAuthor) {
    this.scaleName = scaleName;
    this.scaleAuthor = scaleAuthor ? scaleAuthor : "";
	this.startingFreq = startingFreq;
    this.scaleDegrees = createScaleDegrees(startingFreq);
    this.sustainMode = sustainTone();
    this.isPreset = false;
    this.periodRatio = {numerator: 2, denominator: 1}
}

//userScaleDefinition will be an object, pulled in form front-end inputs. 
    // their inputs include: scaleName, author, startingFreq
        // advanced mode will include: periodRatio

//this function needs to be called and applied to a constant variable 
function generateNewScale (userScaleDefinition) {
    console.log(`i was clicked`)
    // return Object.assign( {}, scaleDefault, userScaleDefinition)
}


// Currently, this function will create an array of objects to attach to scaleDegrees
// This would mean changing the data type of scale.scaleDegrees from an array to a function
//
/** 
 * TODO: add short definition
 * @method createScaleDegrees
 * @param {float} startingFreq is the jumping off point to generate all other tones
 * @return {Object} Description of data returned
 * 
 * @example //TODO: add example
 * 
 * **/
function createScaleDegrees(startingFreq) {
    const pitchArray = []
    //generate tones to the upper limit of human hearing: 20,000 Hz
    
        //Math To Create Tones
            //fnd and loop through the # of tones & their frequencies , based on scale ratio & period
                //start. freq up to 20,000 hz 
            // each tone creates a new tone object

    //PSEUDO CODE
    for (i = 1; i < variableHere; i++) {
       
        const scaleDegree = { 
            scaleDegree: i, 
            frequency: startingFreq, // float
            sustain: false, // TODO: should this be another method?
            activateTone: activateTone(), // TODO: create method
            modifiers: {
                ratio: { 
                        numerator: int, // int
                        denominator: int // int
                    },
                detune: 0 // int, default 0
            }
        }
        
        pitchArray.push(scaleDegree)
    }
    return pitchArray
}



//TODO: create function and attach method to each scaleDegree
function activateTone() {
    // if dom object is is clicked, activate tone 
}
//TODO: should sustainTone be a method?
function sustainTone() {
    // 
}


