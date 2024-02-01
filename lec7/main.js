const submitButton = document.querySelector("button");
const ulElem = document.querySelector("ul");
const inp = document.querySelector("input");
function doSubmit() {
     const inputValue = inp.value;
     if(inputValue.length > 0) {
         const liElem = document.createElement("li");
         liElem.innerText = inputValue;
         ulElem.append(liElem);
         for(const letter of inputValue) { // <-- ADDED
            const spanElem = document.createElement("span"); // <-- ADDED
            spanElem.classList.add("letter"); // <-- ADDED
            //spanElem.innerText = letter; // <-- ADDED
            liElem.append(spanElem); // <-- ADDED
            }
         inp.value = "";
     }
}
submitButton.addEventListener("click", doSubmit);
     inp.addEventListener("keydown", (ev) => { // <-- ADDED
    if(ev.key === "Enter") { // <-- ADDED
         doSubmit(); // <-- ADDED
     } // <-- ADDED
}); // <-- ADDEd

