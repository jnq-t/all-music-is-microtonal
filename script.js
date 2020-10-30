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

//global variables for edit functionality
var globalNoteIndex;
var globalPeriod;
var priorEditIndex;

////helper functions
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
////detune is currently bortken. wrong math? 
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
                if(i % document.getElementById("keys").value == 0)
                {
                    keys[i].setAttribute("class", "keyboard_period");
                    keys[i].setAttribute("id", "note");
                }
                //base case
                else
                {
                    keys[i].setAttribute("class", "keyboard");
                    keys[i].setAttribute("id", "note");
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
//dynamically creates synths, and tiggers them
function synth(frequency, note_index, period)
{
    //for toggle
    globalNoteIndex = note_index;
    //for detune
    globalFrequency = frequency;

    //if edit on
    if (document.getElementById("edit").value == "{edit on}")
    {
        var periodLock = priorEditIndex;
        while (periodLock < keys.length)
        {
            if (periodLock % period == 0)
            {
                keys[periodLock].setAttribute("class", "keyboard_period");
                keys[periodLock].setAttribute("id", "note");
            }
            else 
            {
                keys[periodLock].setAttribute("class", "keyboard");
                keys[periodLock].setAttribute("id", "note");
            }
            periodLock += period;
        }

        //set index for next edit(modulo the period to index by the first period)
        priorEditIndex = note_index % period;
        

        //loop to lock octaves, starting from lowest period 
        periodLock = note_index % period;
        while (periodLock < keys.length)
        {
            
            if (periodLock % period == 0)
            {
                keys[periodLock].setAttribute("class", "edit_period");
                keys[periodLock].setAttribute("id", "selected_period");
            }
            else
            {
                keys[periodLock].setAttribute("class", "edit");
                keys[periodLock].setAttribute("id", "selected");
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
        if (document.getElementById("sustain").value == "{sustain on}")
        {
            //if uninitialized
            if (sustain[note_index] == null)
            {
                //update css class
                ////if special case (modulo the size of pitch class set)
                if(note_index % period == 0)
                {
                    keys[note_index].setAttribute("class", "period_pushed");
                }
                //base case
                else
                {
                   keys[note_index].setAttribute("class", "pushed");
                }

                //update index of sustaining pitches
                sustain[note_index] = true;

                //create synth object
                const synth = new Tone.Synth().toDestination();

                //trigger oscilator
                synth.triggerAttack(frequency);

                 //initialize synth, push into indexed array,
                synths[note_index] = synth;

            }
            //if note already sustaining
            else
            {
                //if special case (modulo the period)
                if(note_index % period == 0)
                {
                    keys[note_index].setAttribute("class", "keyboard_period");
                }

                //base case
                else
                {
                    keys[note_index].setAttribute("class", "keyboard");
                }

                //turn note off, index null
                sustain[note_index] = null;
                synths[note_index].triggerRelease();
            }

        //if sustain is off, give trigger attack-release
        }
        else
        {
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease(frequency, "4n");
        }
    }
}

//when {create} is clicked, builds all buttons
function buildKeyboardET()
{
    var i;

    if (document.getElementById("edit").value == "{edit on}")
    {
         //turn off edit. using 4 here becuase there are  elements to toggle
         editToggle(5);
    }
    //clear any previous buttons
    while (document.getElementById("note") != null)
    {
        var note = document.getElementById("note");
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
            if (i % document.getElementById("keys").value == 0)
            {
                keys[i].setAttribute("class", "keyboard_period");
            }
            //base case
            else
            {
                keys[i].setAttribute("class", "keyboard");
            }
        }

        //empty all global variables
        sustain = [];
        synths = [];
        keys = [];

    //gather paramaters
    var x = document.getElementById("keys").value;
    var pitch = document.getElementById("frequency").value;
    var variable_pitch = document.getElementById("frequency").value;
    var numerator = document.getElementById("period1").value;
    var denominator = document.getElementById("period2").value;
    var period = numerator/denominator;
    var range = document.getElementById("periods").value;

    //set variables
    var period_counter = 1;
    var rounding_constant = 1000000000000;

    //loop once for each pitch class set(music theory)
    for (i=0; i <= (range*x); i++)
    {

        //create buttons(use the digit functions and the synth function)
        var btn = document.createElement("BUTTON");
        btn.innerHTML = ` ${minTwoDigits((i % x)+1)} <sup> ${minFourDigits(Math.round(variable_pitch))} <sup/> Hz` ;
        btn.setAttribute("id", "note");

        //TODO edit mode
        btn.setAttribute("class", "keyboard");
        btn.setAttribute("onclick", `synth(${variable_pitch}, ${i}, ${x})`);

        //if special case (modul0 the period)
        if (i % x == 0)
        {
            btn.setAttribute("class", "keyboard_period");
        }

        //update the HTML
        document.body.appendChild(btn);

        //push into indexed array of button objects
        keys.push(btn);

        //increase pitch
        variable_pitch *= Math.pow(period, 1/x);

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
        if (i % document.getElementById("keys").value == 0)
        {
            keys[i].setAttribute("class", "keyboard_period");
            keys[i].setAttribute("id", "note");

        }
        //base case
        else
        {
            keys[i].setAttribute("class", "keyboard");
            keys[i].setAttribute("id", "note");
        }
    }

    //clear prior selected buttons
    var temp = document.getElementById("selected")
    if (temp != null)
    {
        temp.setAttribute("class", "keyboard");
        temp.setAttribute("id", "note");
    }


    //change the edit button formatting
    if (document.getElementById("edit").value == "{edit}" || document.getElementById("edit").value == "{edit off}")
    {
        document.getElementById("edit").value = "{edit on}"
    }
    else
    {
        document.getElementById("edit").value = "{edit off}"
    }

    //toggle display of hidden html elements
    if (document.getElementById("toggle 0").style.display == "none")
    {
        for (i = 0; i < numberOfItemsToToggle; i++)
        {
            document.getElementById(`toggle ${i}`).style.display = "block";
        }
    }
    else
    {
        for (i = 0; i < numberOfItemsToToggle; i++)
        {
            document.getElementById(`toggle ${i}`).style.display = "none";
        }
    }
}

function apply(index)
{
        //if {set ratio} is pushed
        if (index == 1)
        {
            var pitch = document.getElementById("frequency").value;
            var numerator = document.getElementById("ratio1").value;
            var denominator = document.getElementById("ratio2").value;
            var period = document.getElementById("keys").value;
            ratioPitch = (pitch*numerator)/denominator;
            document.getElementById("selected").innerHTML = `${numerator}:${denominator}<sup> ${minFourDigits(Math.round(ratioPitch))} <sup/> Hz`;
            keys[globalNoteIndex].setAttribute("onclick", `synth(${ratioPitch}, ${globalNoteIndex}, ${period})`);

            //updating global frequency for multiple detunes
            globalFrequency = ratioPitch;
        }

        //if {detune} is pushed
        else 
        { 
            //little function to remove <sup> text from inner            
            var text = document.getElementById("selected").innerHTML;
            var temp = "";
            for (var i = 0; i < text.length; i++)
            {
                if (text[i] == "<")
                {
                    break;
                }
                else
                {
                    temp += (text[i]);
                }
            }

            //detuning
            var cents = document.getElementById("detune").value;
            var detuned = detune(globalFrequency, cents);
            document.getElementById("selected").innerHTML = `${temp}<sup> ${minFourDigits(Math.round(detuned))} <sup/> Hz`
            keys[globalNoteIndex].setAttribute("onclick", `synth(${detuned}, ${globalNoteIndex}, ${period})`);

            //updating global frequency for multiple detunings
            globalFrequency = detuned;
        }
}
