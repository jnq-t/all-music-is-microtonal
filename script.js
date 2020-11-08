//JS FUNCTIONS FOR MICROTONAL KEYBOARD PROJECT
// --10/2020--
// ~JNQT~

////globan variables
//index of sustaining pitches
var sustain = [];

//array of synth objects (indexed)
var synths = [];

//array of button objects (indexed)
var keys = [];

//array of frequencies for reference in the color detune function 
var referencePitches = [];

//global variables for edit functionality
var globalNoteIndex;
var globalPeriod;
var priorEditIndex;

////HELPER FUNCTIONS
//formats all numbers to minimum two digits (function by Göran Andersson AKA Guffa on Stack Overflow)
function minTwoDigits(n)
{
    return (n < 10 ? '0' : '') + n;
}

//formats all numbers to minimum four digits
function minFourDigits(n)
{
    return (n < 1000 ? '0' : '') + n;
}

//detunes by cents 
function detune(currentFrequency, cents)
{
   return currentFrequency * Math.pow(2, cents/1200);
}
//toggles various features (sustain, edit)
function change(button)
{
    //if element is on => off
    if (document.getElementById(button).value == `{${button} on}`)
    {

        //if sustain feature
        if(document.getElementById(button).value == `{${button} on}`)
        {
            var i;
            //turn off all sustained synths
            for(i = 0; i < synths.length; i++)
            {
                if (sustain[i] == true)
                {
                    sustain[i] = null;
                    synths[i].triggerRelease();
                }
            }
            //revert all "pushed" classes
            for (i = 0; i  < keys.length; i++)
            { 
                //if special case (modulo the period)
                if(i % document.getElementById('keys').value == 0)
                {
                    keys[i].setAttribute('class', 'keyboardPeriod');
                }
                //base case
                else
                {
                    keys[i].setAttribute('class', 'keyboard');
                }
            }
        }
        //base case
        document.getElementById(button).value=`{${button} off}`;

    //if element is off => on
    }
    else
    {
        document.getElementById(button).value=`{${button} on}`;
    }
}

//function for turning positive detunings green and negative detunings red
//values are rounded to prevent drift inacuracies
function detuneColor()
{
    let roundedGlobal = Math.round(globalFrequency * 100000) / 100000;
    let roundedReference = Math.round(referencePitches[globalNoteIndex] * 100000) / 100000;
    let temp = globalNoteIndex %  document.getElementById('keys').value; 
    while (temp <= (parseInt(document.getElementById('keys').value, 10) * parseInt(document.getElementById('periods').value, 10)))
    {
        if (roundedGlobal > roundedReference)
        {
        //set to green
        document.getElementById(`${temp}`).classList.remove('negative');
        document.getElementById(`${temp}`).classList.add('positive');
        // console.log(`frequency is ${roundedGlobal}, reference is ${roundedReference}`);
        }
    
        else if (roundedGlobal < roundedReference)
        {
            //set to red
            document.getElementById(`${temp}`).classList.remove('positive');
            document.getElementById(`${temp}`).classList.add('negative');
            
        }
        else 
        {
            //leave as is
            document.getElementById(`${temp}`).classList.remove('positive');
            document.getElementById(`${temp}`).classList.remove('negative');
     
        }
        temp += parseInt(document.getElementById('keys').value, 10);
    }
}





////MAIN FUNCTIONS
//dynamically creates synths, and tiggers them
function synth(frequency, noteIndex, period)
{
    //for toggle
    globalNoteIndex = noteIndex;
    //for detune
    globalFrequency = frequency;
    //for colorDetune
    referencePitches[globalNoteIndex] = globalFrequency;

    //if edit on
    if (document.getElementById('edit').value == '{edit on}')
    {
        var periodLock = priorEditIndex;
        while (periodLock < keys.length)
        {
            if (periodLock % period == 0)
            {
                keys[periodLock].classList.remove('editPeriod');
            }
            else 
            {
                keys[periodLock].classList.remove('edit');
            }
            periodLock += period;
        }

        //set index for next edit(modulo the period to index by the first period)
        priorEditIndex = noteIndex % period;
        

        //loop to lock octaves, starting from lowest period 
        periodLock = noteIndex % period;
        while (periodLock < keys.length)
        {
            
            if (periodLock % period == 0)
            {

                keys[periodLock].classList.add('editPeriod');
            }
            else
            {
                keys[periodLock].classList.add('edit');
            }
            periodLock += period;
        }
        
       //return without triggering synth
        return;
    }
    //if edit off
    else
    {
        //if sustain on
        if (document.getElementById('sustain').value == '{sustain on}')
        {
            //if uninitialized
            if (sustain[noteIndex] == null)
            {
                //update css class
                ////if special case (modulo the size of pitch class set)
                if(noteIndex % period == 0)
                {
                    keys[noteIndex].classList.add('periodPushed');
                }
                //base case
                else
                {
                   keys[noteIndex].classList.add('pushed');
                }

                //update index of sustaining pitches
                sustain[noteIndex] = true;

                //create synth object
                const synth = new Tone.Synth().toDestination();

                //trigger oscilator
                synth.triggerAttack(frequency);

                 //initialize synth, push into indexed array,
                synths[noteIndex] = synth;

            }
            //if note already sustaining
            else
            {
                //if special case (modulo the period)
                if(noteIndex % period == 0)
                {
                    keys[noteIndex].classList.remove('periodPushed');
                }

                //base case
                else
                {
                    keys[noteIndex].classList.remove('pushed');
                }

                //turn note off, index null
                sustain[noteIndex] = null;
                synths[noteIndex].triggerRelease();
            }

        //if sustain is off, give trigger attack-release
        }
        else
        {
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease(frequency, '4n');
        }
    }
}

//when {create} is clicked, builds all buttons
function buildKeyboardET()
{
    var i;

    if (document.getElementById('edit').value == '{edit on}')
    {
         //turn off edit. using 4 here becuase there are  elements to toggle
         editToggle(5);
    }

    //clear any previous buttons
    while (document.querySelector('.keyboard') != null)
    {
        var note = document.querySelector('.keyboard');
        document.body.removeChild(note);
    }
    while (document.querySelector('.keyboardPeriod') != null)
    {
        var note = document.querySelector('.keyboardPeriod');
        document.body.removeChild(note);
    }

    //turn off all sustained synths
    for (i = 0; i < synths.length; i++)
    {
        if (sustain[i] == true)
        {
            sustain[i] = null;
            synths[i].triggerRelease();
        }
    }
    //revert all "pressed" classes
    for (i = 0; i  < keys.length; i++)
    {
        //if special case (modulo the period)
        if (i % document.getElementById('keys').value == 0)
        {
            keys[i].setAttribute('class', 'keyboardPeriod');
        }
        //base case
        else
        {
            keys[i].setAttribute('class', 'keyboard');
        }
    }

    //empty all global variables
    sustain = [];
    synths = [];
    keys = [];

    //gather paramaters
    var x = document.getElementById('keys').value;
    var pitch = document.getElementById('frequency').value;
    var variablePitch = document.getElementById('frequency').value;
    var numerator = document.getElementById('period1').value;
    var denominator = document.getElementById('period2').value;
    var period = numerator/denominator;
    var range = document.getElementById('periods').value;

    //loop once for each pitch class set(music theory)
    for (i=0; i <= (range*x); i++)
    {

        //create buttons(use the digit functions and the synth function)
        var btn = document.createElement('BUTTON');
        btn.innerHTML = ` ${minTwoDigits((i % x)+1)} <sup> ${minFourDigits(Math.round(variablePitch))} <sup/> Hz` ;
        btn.setAttribute('id', `${i}`);

        //TODO edit mode
        btn.setAttribute('class', 'keyboard');
        btn.setAttribute('onclick', `synth(${variablePitch}, ${i}, ${x})`);

        //if special case (modul0 the period)
        if (i % x == 0)
        {
            btn.setAttribute('class', 'keyboardPeriod');
        }

        //update the HTML
        document.body.appendChild(btn);

        //push into indexed array of button objects
        keys.push(btn);

        //increase pitch
        variablePitch *= Math.pow(period, 1/x);

    }
}

function editToggle(numberOfItemsToToggle)
{
    //index
    var i;

    //turn off all sustained synths
    for (i = 0; i < synths.length; i++)
    {
        if (sustain[i] == true)
        {
            sustain[i] = null;
            synths[i].triggerRelease();
        }
    }
    //revert all "pushed" classes
    for (i = 0; i  < keys.length; i++)
    {
        //if special case (modulo the period)
        if (i % document.getElementById('keys').value == 0)
        {
            keys[i].classList.remove('periodPushed');
            keys[i].classList.remove('editPeriod');

        }
        //base case
        else
        {
            keys[i].classList.remove('pushed');
            keys[i].classList.remove('edit');
        }
    }

    //clear prior selected buttons
    while (document.querySelector('.edit') != null)
    {
        temp = document.querySelector('.edit')
        temp.classList.remove('edit');
    }
    while (document.querySelector('.editPeriod') != null)
    {
        temp = document.querySelector('.editPeriod')
        temp.classList.remove('editPeriod');
    }



    //change the edit button formatting
    if (document.getElementById('edit').value == '{edit}' || document.getElementById('edit').value == '{edit off}')
    {
        document.getElementById('edit').value = '{edit on}'
    }
    else
    {
        document.getElementById('edit').value = '{edit off}'
    }

    //toggle display of hidden html elements
    if (document.getElementById('toggle 0').style.display == 'none')
    {
        for (i = 0; i < numberOfItemsToToggle; i++)
        {
            document.getElementById(`toggle ${i}`).style.display = 'block';
        }
    }
    else
    {
        for (i = 0; i < numberOfItemsToToggle; i++)
        {
            document.getElementById(`toggle ${i}`).style.display = 'none';
        }
    }
}

function apply(index)
{
    //remove negative and positive colors
    var pitch = document.getElementById('frequency').value;
    var periodKeys = parseInt(document.getElementById('keys').value, 10);
    var numerator = document.getElementById('period1').value;
    var denominator = document.getElementById('period2').value;
    var period = numerator/denominator;
    var counter = 0;

    //if {set ratio} is pushed
    if (index == 1)
    {
        var numeratorRatio = document.getElementById('ratio1').value;
        var denominatorRatio = document.getElementById('ratio2').value;
        var ratioPitch = (pitch*numeratorRatio)/denominatorRatio;

        //updating global frequency for multiple detunes and for detuneColor
        globalFrequency = ratioPitch;
        referencePitches[globalNoteIndex] = ratioPitch;

        console.log(`globalFrequency now equals ratio pitch of ${ratioPitch}`);
    
        //loop to frequency lock periods
        var periodIndex = globalNoteIndex % periodKeys;
        for (var i = 0; i < keys.length; i++)
        {
            if (i == periodIndex)
            {
                keys[i].classList.remove('positive');
                keys[i].classList.remove('negative');
                let multiplyer = Math.pow(period, counter);
                let number = ratioPitch * multiplyer;
                keys[i].innerHTML = `${numeratorRatio}:${denominatorRatio}<sup> ${minFourDigits(Math.round(number))} <sup/> Hz`;
                keys[i].setAttribute('onclick', `synth(${number}, ${periodIndex}, ${periodKeys})`);
                periodIndex += periodKeys;
                counter++;
            }
        }
    }

    //if {detune} is pushed
    else 
    { 

        //loop to locate each selected key 

        periodIndex = globalNoteIndex % periodKeys;
        console.log(`check, period keys is ${periodKeys}`);
        console.log(`check, period index is ${periodIndex}`);
        var text;
        var temp;
        counter = 0;
        for (i = 0; i < keys.length; i++)
        {
            temp = "";
            if (i == periodIndex)
            {
                //selects each key in the correct period
                text = keys[i].innerHTML;
                for (j = 0; j < text.length; j++)
                {
                    if (text[j] == "<")
                    {
                        break;
                    }
                    else
                    {
                        temp += text[j];
                    }
                }
            
            //detune here
                var cents = document.getElementById('detune').value;
                let multiplyer = Math.pow(period, counter);
                var detuned = detune(globalFrequency, cents);
                var finalPitch = detuned * multiplyer;
                keys[i].innerHTML = `${temp}<sup> ${minFourDigits(Math.round(finalPitch))} <sup/> Hz`;
                keys[i].setAttribute("onclick", `synth(${finalPitch}, ${i}, ${periodKeys})`);
                periodIndex += periodKeys;
                counter++;
            } 
        }
        //detuning
        //updating global frequency for multiple detunings

        globalFrequency = detuned;
        console.log(`global frequency is ${globalFrequency}`);

        //check for color
        detuneColor();
    }
}