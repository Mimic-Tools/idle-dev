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
function uploadSave(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const uploadedData = JSON.parse(e.target.result);
                gameData = uploadedData;
                saveGame();  // Save the uploaded data to localStorage
                updateDisplay();
                console.log("Game save uploaded and loaded!");
            } catch (err) {
                console.error("Invalid file format!", err);
            }
        };
        reader.readAsText(file);
    }
}

// On button click, increase resources
document.getElementById('click-button').addEventListener('click', () => {
    gameData.resources += gameData.resourcePerClick;
    updateDisplay();
});

// // Save button
// document.getElementById('save-button').addEventListener('click', saveGame);

// // Load button
// document.getElementById('load-button').addEventListener('click', loadGame);

// Download save button
document.getElementById('download-save').addEventListener('click', downloadSave);
// Upload save button
document.getElementById('upload-save').addEventListener('click', uploadSave);


// Load game data on page refresh
window.onload = loadGame;

// Automatically save game every second
setInterval(saveGame, 1000);

// Initial display update
updateDisplay();
