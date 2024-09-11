export default function inputElement(inputClassName, inputName, inputType, inputAriaLabel) {
    const input = Object.assign(document.createElement('input'), 
        {className: inputClassName },
        {name: inputName},
        {type: inputType},
        {ariaLabel: inputAriaLabel}
    )
    return input
}