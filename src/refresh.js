
// Function to update the resources display
function updateDisplay() {
    list = document.getElementById('resource-list');
    list.innerHTML = "";

    Object.entries(gameData.resources).forEach(([what, amount]) => {
        entry = document.createElement('div');
        entry.innerHTML += `${what}: ${amount}`
        list.appendChild(entry);
    });
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
            if (quest.complete == false || 0){
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