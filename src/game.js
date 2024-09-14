// Idle Game Logic
let gameData = {
    resources: {}
};


function getResource(resource_type) {
    prevValue = gameData.resources[resource_type] ?? 0;
    gameData.resources[resource_type] = prevValue + 1;
    updateDisplay();
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
            if (quest.complete || 0){
                questDiv.className = `quest alert alert-success`;
            }else{
                questDiv.className = `quest alert alert-warning`;
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

