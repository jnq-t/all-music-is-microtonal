/**
 * Methods
 */

function updateKeyboard() {}
function updateDB() {}

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


  