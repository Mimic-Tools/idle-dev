
// Function to update the resources display
function updateDisplay() {
    // resources 
    list = document.getElementById('resource-list');
    list.innerHTML = "";

    Object.entries(gameData.resources).forEach(([what, amount]) => {
        entry = document.createElement('div');
        entry.innerHTML = `${what}: ${amount}`
        list.appendChild(entry);
    });

    // quests
    checkQuestProgress();
    renderQuests();
}


function renderQuests() {
    questlines = window.quest_data

    const container = document.getElementById('quest-container');
    container.innerHTML = ''; // Clear container before rendering

    questlines.forEach(questLine => {
        const questLineDiv = document.createElement('div');
        questLineDiv.innerHTML = `<h4>${questLine.title}</h4><hr />`;

        questLine["items"].forEach(quest => {
            const questDiv = document.createElement('div');
            if (!quest.complete){
                questDiv.className = `quest alert alert-warning`;
            }else{
                questDiv.className = `quest alert alert-success`;
            }
            questDiv.innerHTML = `<strong>${quest.title}</strong><br/>`
            Object.entries(quest.criteria).forEach(([what, amount]) => {
                questDiv.innerHTML += `${what}: ${amount}`
            });
            questLineDiv.appendChild(questDiv);
        });
        container.appendChild(questLineDiv);
    });
}

async function fetchQuests() {
    try {
        const response = await fetch('data/quests.json');
        const data = await response.json();
        window.quest_data = data;
    } catch (error) {
        console.error('Error fetching the quests:', error);
    }
}

// Execute tasks in sequence using async/await
async function initGame() {
    await loadGame();         // Ensure game data is loaded first
    await fetchQuests();      // After that, fetch and render quests
    updateDisplay();          // Then update the display
    setInterval(saveGame, 1000);  // Finally, start auto-saving game data every second
}

// Load game data on page refresh
window.onload = initGame;
