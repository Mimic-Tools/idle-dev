// Idle Game Logic
let gameData = {
    resources: {
        "bones": 0,
        "fish": 0,
        "gold": 0,
        "simps": 0,
        "pelts": 0,
    },
    resourcePerClick: 1
};

// Function to update the resources display
function updateDisplay() {
    document.getElementById('resource-bones').innerText = gameData.resources["bones"];
    document.getElementById('resource-fish').innerText = gameData.resources["fish"];
    document.getElementById('resource-gold').innerText = gameData.resources["gold"];
    document.getElementById('resource-simp').innerText = gameData.resources["simps"];
    document.getElementById('resource-pelt').innerText = gameData.resources["pelts"];
    
}

// Function to save game data to localStorage
function saveGame() {
    localStorage.setItem('idleGameSave', JSON.stringify(gameData));
    console.log("Game saved!");
}

function clearSave() {
    localStorage.removeItem('idleGameSave');
    console.log("Game save cleared from localStorage.");
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

function getResource(resource_type){
    gameData.resources[resource_type] += gameData.resourcePerClick;
    updateDisplay();
}

document.getElementById('download-save').addEventListener('click', downloadSave);
document.getElementById('upload-save').addEventListener('click', uploadSave);
document.getElementById('clear-save').addEventListener('click', clearSave);

// Load game data on page refresh
window.onload = loadGame;

// Automatically save game every second
setInterval(saveGame, 1000);

// Initial display update
updateDisplay();
