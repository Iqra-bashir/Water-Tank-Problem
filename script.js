
  



























// Sample input
const calculateBtn = document.getElementById("calculateBtn");
const blockInput = document.getElementById("blockInput");
const resultDiv = document.getElementById("result");

calculateBtn.addEventListener("click", function () {
    const blockHeights = blockInput.value.split(",").map(height => parseInt(height));
    const unitsOfWater = calculateUnitsOfWater(blockHeights);
    resultDiv.innerHTML = `<p>Output:  Units of water: ${unitsOfWater}</p>`;


    const maxHeight = Math.max(...blockHeights);
// Create an SVG chart
const chart = document.getElementById("chart");
chart.setAttribute("width", "500");
chart.setAttribute("height", "250");
// Draw the blocks
for (let i = 0; i < blockHeights.length; i++) {
  const block = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  block.setAttribute("x", i * 50);
  block.setAttribute("y", maxHeight * 50 - blockHeights[i] * 50);
  block.setAttribute("width", 50);
    block.setAttribute("height", blockHeights[i] * 50);
    block.setAttribute("fill", "yellow");
  chart.appendChild(block);
    }

// Draw the water units

for (let i = 0; i < blockHeights.length; i++) {
    if (blockHeights[i] === 0) {
        let waterHeight = 0;
        let waterWidth = 50;
        let waterX = i * 50;
        let waterY = maxHeight * 50;
        for (let j = i + 1; j < blockHeights.length; j++) {
            if (blockHeights[j] !== 0) {
                waterHeight = (maxHeight - Math.max(...blockHeights.slice(i, j))) * 50;
                waterWidth = (j - i) * 50;
                waterX = i * 50;
                waterY = (maxHeight - Math.max(...blockHeights.slice(i, j))) * 50;
                break;
            }
        }
        const water = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        water.setAttribute("x", waterX);
        water.setAttribute("y", waterY);
        water.setAttribute("width", waterWidth);
        water.setAttribute("height", waterHeight);
        water.setAttribute("fill", "blue");
        chart.appendChild(water);
    }
}

});

// Compute the units of water stored
function calculateUnitsOfWater(blockHeights) {
    let left = 0;
    let right = blockHeights.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let unitsOfWater = 0;
    
    
    while (left < right) {
        if (blockHeights[left] < blockHeights[right]) {
            if (blockHeights[left] > leftMax) {
                leftMax = blockHeights[left];
            } else {
                unitsOfWater += leftMax - blockHeights[left];
            }
            left++;
        } else {
            if (blockHeights[right] > rightMax) {
                rightMax = blockHeights[right];
            } else {
                unitsOfWater += rightMax - blockHeights[right];
            }
            right--;
        }
       
    }
   
    return unitsOfWater;
}



