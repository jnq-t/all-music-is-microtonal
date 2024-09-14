export default function inputLabel(className, correspondingInputName, labelText){
    const inputLabel = Object.assign(document.createElement('label'), 
        {className: className },
        {htmlFor: correspondingInputName},
        {innerText: labelText}
)
    return inputLabel
}