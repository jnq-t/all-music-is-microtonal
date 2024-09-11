
const mock_data = {
    scaleName: 'mock name',
    startingFreq: '240',
    scaleLength: '12',
    octaveSpan: '5'
  }

const scaleDataParentContainer = Object.assign(document.createElement('div'), 
    {id: "created-scale-data-container"}
)
const inputsContainer = Object.assign(document.createElement('div'), 
    {id: "created-scale-data-inputs-container"},
    {className: "scale-data-inputs-container"}
)

/**
 * Setup of DOM Elements
 */

// scale name
const scaleNameInputContainer = scaleInputContainer('scale-name-container');
scaleNameInputContainer.appendChild( 
    scaleInputLabel('scale-name-label', 'scale-name', 'Scale Name')
);
scaleNameInputContainer.appendChild( 
    scaleInput('scale-name-input', 'scale-name', 'text', 'name of scale', mock_data.scaleName )
);
inputsContainer.appendChild(scaleNameInputContainer);

// scale starting freq.
const scaleFrequencyInputContainer = scaleInputContainer('starting-frequency-container');
scaleFrequencyInputContainer.appendChild( 
    scaleInputLabel('starting-frequency-label', 'starting-frequency', 'Starting Frequency')
);
scaleFrequencyInputContainer.appendChild( 
    scaleInput('starting-frequency-input', 'starting-frequency', 'number', 'scale starting frequency', mock_data.startingFreq  )
);
inputsContainer.appendChild(scaleFrequencyInputContainer);

// scale length
const scaleLengthInputContainer = scaleInputContainer('length-of-scale-container');
scaleLengthInputContainer.appendChild( 
    scaleInputLabel('length-of-scale-label', 'length-of-scale', 'Length of Scale')
);
scaleLengthInputContainer.appendChild( 
    scaleInput('length-of-scale-input', 'length-of-scale', 'number', 'length of scale', mock_data.scaleLength )
);
inputsContainer.appendChild(scaleLengthInputContainer);

// scale's octave span
const octaveSpanInputContainer = scaleInputContainer('octave-span-container');
octaveSpanInputContainer.appendChild( 
    scaleInputLabel('octave-span-label', 'octave-span', 'Octave Span')
);
octaveSpanInputContainer.appendChild( 
    scaleInput('octave-span-input', 'octave-span', 'number', 'octave span', mock_data.octaveSpan )
);
inputsContainer.appendChild(octaveSpanInputContainer);


scaleDataParentContainer.appendChild( inputsContainer );
scaleDataParentContainer.appendChild( updateBtn() );

export default scaleDataParentContainer

/**
 * Methods
 */

function initialScaleData() {}
function updateKeyboard() {}
function updateDB() {}

/** 
 * DOM Element Creation Methods 
 */
function scaleInputContainer(className) {
    const inputsContainer = Object.assign(document.createElement('div'), 
        {id: `created-scale-item scale-input-container ${className}`}
    );
    return inputsContainer;
}

function scaleInputLabel(className, correspondingInputName, labelText){
    const div = document.createElement('div')
    const inputLabel = Object.assign(document.createElement('label'), 
        {className: `created-scale-label scale-label ${className}` },
        {htmlFor: correspondingInputName},
        {innerText: labelText}
)
    console.log(labelText)
    div.appendChild(inputLabel)
    return div
}

function scaleInput(inputId, inputName, inputType, inputAriaLabel, initialValue) {
    const input = Object.assign(document.createElement('input'), 
        {className: `created-scale-input scale-input` },
        {id: inputId },
        {name: inputName},
        {type: inputType},
        {ariaLabel: inputAriaLabel},
        {value: initialValue}
    )
    console.log(initialValue)
    return input
}

function updateBtn() {
    const updateBtn = Object.assign(document.createElement('button'), 
        {id: "update-scale-btn" },
        {className: "scale-btn" },
        {value: "Update Scale"},
        {ariaLabel: "update scale"},
        {innerText: "Update Scale"}
    )
    return updateBtn
}


  