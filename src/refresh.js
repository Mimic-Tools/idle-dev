
// Function to update the resources display
function updateDisplay() {
    list = document.getElementById('resource-list');

    Object.entries(gameData.resources).forEach(([what, amount]) => {
        entry = document.createElement('div');
        entry.innerHTML += `${what}: ${amount}`
        list.appendChild(entry);
    });
}


// Fetch quests from the JSON file
fetch('data/quests.json')
    .then(response => response.json())
    .then(data => {
        window.quest_data = data;
        renderQuests();
    })
    .catch(error => {
        console.error('Error fetching the quests:', error);
    });


// Initial display update
updateDisplay();


// Automatically save game every second
setInterval(checkQuestProgress, 1000);