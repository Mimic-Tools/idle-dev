// Idle Game Logic
let gameData = {
    resources: {}
};


function getResource(resource_type) {
    prevValue = gameData.resources[resource_type] ?? 0;
    gameData.resources[resource_type] = prevValue + 1;
    updateDisplay();
}

