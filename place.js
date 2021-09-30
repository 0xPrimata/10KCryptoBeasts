(d => {

    // Build an array of span elements
    const pathsGrid=document.getElementById("pathsGrid")
    let gridLength = 100;
    let gridSize = gridLength * gridLength;
    let spanArray = []; 
  
    for (let i = 0; i < gridSize; i += 1) {
      span = d.createElement("span");
      spanArray.push(span);    
    }
  
    // The position of the print head, starting in the center
    let currentIndex = (gridSize / 2) + (gridLength / 2);  
  
    // For colouring paths
    let iString = "";
    let colours = ["#F9FE8C", "#E61F97", "#00065C", "#33007B", "#FF0000", "#41A4E6", "#302F7B", "#B818B6", "#86F715", "#fff"];
    let n = [0,1,2,3,4,5,6,7,8,9]

    
    let currentColour = 0;
  
    // Directions: differences in span indexes as the print head moves
    let up = -gridLength;
    let down = +gridLength;
    let right = 1;
    let left = -1;
    let directions = [up, left, down, right];

    const isPrime = num => {
      for(let i = 2, s = Math.sqrt(num); i <= s; i++)
          if(num % i === 0) return false; 
      return true;
  }
  
    // Current direction of travel of the print head
    let currentDirection = 0;  
    // Spans left to check before turning
    let stepsRemaining = 1;
    // A path is the total straight side of the spiral before a turn is made
    let pathLength = 1;
    // This accounts for tight spiraling at the start of the loop (it should not increment until two directional turns)
    let pathsTraversed = -1;
  
    // Step through the natural numbers
    for (let i = 1; i <= gridSize; i += 1) {
      
      currentColour = Math.floor(((i-1) % 1000) / 100);
        
      // If no steps remain, the print head is at the end of a path. Log that with pathsTraversed.
      if (stepsRemaining === 0) {
        pathsTraversed += 1;
  
        // On paths of an odd number, increase the path length 
        if (pathsTraversed % 2 === 1) {
          pathLength += 1;
        }
        // Change direction and reset steps remaining
        currentDirection = (currentDirection + 1) % 4;
        stepsRemaining = pathLength;
      }
  
      // Print a number to the current span 
      // iString = String(i-1);
      // spanArray[currentIndex].textContent = iString;
      // spanArray[currentIndex].id = "e" + iString;
      // Colour the current span according to current path colour
      let img = new Image();
      spanArray[currentIndex].appendChild(img);
      img.src = "Egg"+currentColour+".jpg";
      // spanArray[currentIndex].style.backgroundColor = colours[currentColour];
      if (isPrime(i-1)){
        spanArray[currentIndex].style.borderColor = "gold";
      }
      
  
      // Move print head one square in current direction
      currentIndex += directions[currentDirection];
      stepsRemaining -= 1;
    }
  
    // Append span array elements to a fragment, to send back to DOM in one go
    let fragment = d.createDocumentFragment();
    for (let i = 0; i < spanArray.length; i += 1) {
      fragment.append(spanArray[i]);
    }  
  
    pathsGrid.append(fragment);
  
  })(document);
