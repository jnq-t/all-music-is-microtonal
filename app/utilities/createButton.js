export default function buttonElement(btnId, btnClassName, btnAriaLabel, btnValue, btnInnerText) {
    const button = Object.assign(document.createElement("button"), 
        {id: btnId},
        {className: btnClassName},
        {ariaLabel: btnAriaLabel},
        {value: btnValue},
        {innerText: btnInnerText}
    );
    return button;
}
