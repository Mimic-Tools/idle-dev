
function questFufilled(questCriteria, playerResources) {
    return Object.keys(questCriteria).every(resource => 
        (playerResources[resource] || 0) >= questCriteria[resource]
    );
}

function checkQuestProgress(){
    
    // Iterate over questlines and quests to check if the state needs to change
    window.quest_data.forEach(questline => {
        questline.items.forEach(quest => {
            if (questFufilled(quest.criteria, gameData.resources)) {
                quest.complete = true;
                console.log("questFufilled:", quest);
            } else {
                quest.complete = false;
                console.log("unfufilled:", quest);
            }
        });
    });


    renderQuests();
}