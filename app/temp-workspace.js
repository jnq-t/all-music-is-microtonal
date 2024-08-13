
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

// does not contain scale degrees
// STUBBED DATA END 

//set defaults at database level
const stubbedScaleDefault =  {
    scaleName: "",
    author: "",
    sustainMode: false,
    isPreset: false,
    scaleDegrees: [],
    periodRatio: { // Period Ratio Creates Scale Degrees
        numerator: 2, 
        denominator: 1
    },
    startingFreq: 420,
    
};

//userScaleDefinition will be an object, pulled in form front-end inputs. 
    // their inputs include: scaleName, author, startingFreq
        // advanced mode will include: periodRatio

//this function needs to be called and applied to a constant variable 
function generateNewScale (userScaleDefinition) {
    return Object.assign( {}, scaleDefault, userScaleDefinition)
}



function createScaleDegrees(startingFreq) {
    const pitchArray = []
    //generate tones to the upper limit of human hearing: 20,000 Hz
    
        //Math Too Create Tones
            //fnd and loop through the # of tones & their frequencies , based on scale ratio & period
                //start. freq - 20,000 hz 
            // each tone creates a new tone object

            // { 
                // scaleDegree: i,
                // frequency: float, 
                // sustain: boolean, — default false
                // activateTone: f(),
                // modifier: {
                // ratio: { 
                //  numerator: int, 
                //  denominator: int 
                //  },
                // detune: int — default 0
                // }
            // }
    
            //push each tone object into scaleDegrees empty array
            // pitchArray.push()

}

//TODO: create function and attach method to scaleDegree
function activateTone() {

}