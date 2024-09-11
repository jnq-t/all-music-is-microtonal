export default function inputLabel(className, correspondingInputName, labelText){
    const inputLabel = Object.assign(document.createElement('label'), 
        {className: `created-scale-label scale-label ${className}` },
        {htmlFor: correspondingInputName},
        {innerText: labelText}
)
    return inputLabel
}