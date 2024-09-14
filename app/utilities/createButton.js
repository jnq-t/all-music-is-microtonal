export default function buttonElement(btnId, btnClassName, btnValue, btnAriaLabel, btnInnerText) {
    const button = Object.assign(document.createElement("button"), 
        {id: btnId},
        {className: btnClassName},
        {ariaLabel: btnAriaLabel},
        {value: btnValue},
        {innerText: btnInnerText}
    );
    return button;
}
