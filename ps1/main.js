let score = 0;
let moleInterval;
<<<<<<< HEAD
=======

//I used ChatGPT to help with the click functions, I was having issues with the clicks registering and the score so I plugged the whole section in and then pulled
// and edited it as it wasn't perfect 

>>>>>>> 2d6a29b2e5e3abbefd4051cb346cb94cdeef2b30
// Write code that *every second*, picks a random unwhacked hole (use getRandomUnwhackedHoleId)
// and adds the "needs-whack" class
const interval = setInterval(() => {
    const randomHoleId = getRandomUnwhackedHoleId();
    
    if(randomHoleId) {
        const holeElement = document.getElementById(randomHoleId);
        
        //if (!holeElement.classList.contains('needs-whack')) {
        
        holeElement.classList.add('needs-whack');
        console.log("added needs-whack class to random hole");
    }
        
    //const randomHole = getRandomUnwhackedHoleId();
    //document.getElementById(getRandomUnwhackedHoleId).classList.add("needs-whack");
    console.log('TODO: Add the "needs-whack" class to a random hole');
}, 1000);

for(const id of getAllHoleIds()) {
    const holeElement = document.getElementById(id);
    holeElement.addEventListener('click', () =>{
        console.log("clicked");
         if (holeElement.classList.contains('needs-whack')){
             holeElement.classList.remove('needs-whack');
             

             holeElement.classList.add('animating-whack');
             setTimeout(() =>{
                holeElement.classList.remove('animating-whack');
             }, 500);

             score++;
             document.getElementById('score').innerText = `Score: ${score}`;
             if (score >=45) {
                 clearInterval(interval);
             }
    
        }
    })
    console.log(`TODO: Add a click listener for #${id} here`);
    }
    
    // Write code that adds a "click" listener to the element with this id
    //     When the user clicks on it, *if* the element has class "needs-whack" then:
    //          1. Remove the "needs-whack" class
    //          2. Add the "animating-whack" class *for 500 milliseconds*
    //          3. Increment the score by 1 (and update the score display)
    //          4. If the score is 45 or higher, stop the game (by clearing the interval)
/**
 * @returns a random ID of a hole that is "idle" (doesn't currently contain a mole/buckeye). If there are none, returns null
 */
function getRandomUnwhackedHoleId() {
    const inactiveHoles = document.querySelectorAll('.hole:not(.needs-whack)');  // Selects elements that have class "hole" but **not** "needs-whack"

    if(inactiveHoles.length === 0) {
        return null;
    } else {
        const randomIndex = Math.floor(Math.random() * inactiveHoles.length);
        return inactiveHoles[randomIndex].getAttribute('id');
    }
}

/**
 * @returns a list of IDs (as strings) for each hole DOM element
 */
function getAllHoleIds() {
    const allHoles = document.querySelectorAll('.hole'); 
    const ids = [];
    for(const hole of allHoles) {
        ids.push(hole.getAttribute('id'));
    }
    return ids;
}
