// Idle Game Logic
let gameData = {
    resources: 0,
    resourcePerClick: 1
};

// Function to update the resources display
function updateDisplay() {
    document.getElementById('resources').innerText = gameData.resources;
}

// Function to save game data to localStorage
function saveGame() {
    localStorage.setItem('idleGameSave', JSON.stringify(gameData));
    console.log("Game saved!");
}

// Function to load game data from localStorage
function loadGame() {
    const savedData = localStorage.getItem('idleGameSave');
    if (savedData) {
        gameData = JSON.parse(savedData);
        updateDisplay();
        console.log("Game loaded!");
    } else {
        console.log("No save data found.");
    }
}

// Function to download game data as a JSON file
function downloadSave() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gameData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "idleGameSave.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// On button click, increase resources
document.getElementById('click-button').addEventListener('click', () => {
    gameData.resources += gameData.resourcePerClick;
    updateDisplay();
});

// Save button
document.getElementById('save-button').addEventListener('click', saveGame);

// Load button
document.getElementById('load-button').addEventListener('click', loadGame);

// Download save button
document.getElementById('download-save').addEventListener('click', downloadSave);

// Initial display update
updateDisplay();
