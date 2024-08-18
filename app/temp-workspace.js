/** CODE COMMENTS -  BEST PRACTICES
 *
 * @method name of function
 * @params parameters/arguments accepted, example: {Type} name Description
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


//STUBBED DATA START
const inputScale =  {
	name: "Test Scale",  
	author: "Pluto & Jesse",
	isPreset: "false",
	scaleDegrees: [], 
    sustainMode: false,
	startingFreq: 420,
	periodRatio: { // Period Ratio Creates Scale Degrees
        numerator: 2, 
        denominator: 1
    } 	
};

//TODO: function list 
// function findOrInitializeScale () { findOrInitializeScale } (GET scale)
//  	return Scale 
//

// ScaleSchema Defaults - use for localStorage
const scaleDefaults =  {
    scaleName: "",
    author: "",
    sustainMode: false,
    isPreset: false,
    scaleDegrees: createScaleDegrees(startingFreq), // changed to function that returns an array of objects
    periodRatio: { // Period Ratio Creates Scale Degrees
        numerator: 2, 
        denominator: 1
    },
    startingFreq: 420,
};

//TODO: read about and learn polymorphism to use for scale
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
function createScaleDegrees(startingFreq) {
    const pitchArray = []
    //generate tones to the upper limit of human hearing: 20,000 Hz
    
        //Math To Create Tones
            //fnd and loop through the # of tones & their frequencies , based on scale ratio & period
                //start. freq up to 20,000 hz 
            // each tone creates a new tone object

    //PSEUDO CODE
    for (i = variableHere; i < variableHere; i++) {
       
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

}
//TODO: should sustainNote be a method?
function sustainNote() {

}