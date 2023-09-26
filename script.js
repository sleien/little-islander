// Initialize an object to store the calculated skills
const skills = {
    Diplomacy: 0,
    ConflictResolution: 0,
    Empathy: 0,
    Judgement: 0,
    Leadership: 0,
    Delegation: 0,
    Teamwork: 0,
    ProblemSolving: 0,
    Logic: 0,
    Intuition: 0,
    Communication: 0,
    Networking: 0,
    Analysis: 0,
    Focus: 0,
    Endurance: 0,
    Patience: 0,
    Strategy: 0,
    Creativity: 0,
    Planning: 0,
    TimeManagement: 0,
    Memory: 0,
    Strength: 0,
    Agility: 0,
    Knowledge: 0,
    Learning: 0,
    Resourcefulness: 0,
    Foraging: 0,
    Crafting: 0,
    Reporting: 0,
    Persuasion: 0,
    Bartering: 0,
    Compromising: 0,
    Understanding: 0,
    Scavenging: 0,
    Innovation: 0,
    InformationGathering: 0,
    Research: 0,
    Organizing: 0,
    Prioritizing: 0,
    BuildingRelationships: 0,
    RationalThinking: 0,
    Ethics: 0,
    Experimentation: 0,
    IdeaGeneration: 0,
    Supporting: 0,
    Peacekeeping: 0,
    RiskTaking: 0,
    FireMaking: 0,
    Exploration: 0
};


const skillCount = {
    ...skills
};

// Fetch questions from JSON file and append them to the questionnaire
fetch('questions.json')
    .then(response => response.json())
    .then(questions => {
        const questionnaire = document.getElementById('questionnaire');
        questions.forEach(question => {
            const p = document.createElement('p');
            p.innerText = question.question;
            questionnaire.insertBefore(p, questionnaire.getElementsByTagName('button')[0]);

            const select = document.createElement('select');
            select.id = question.id;
            // Shuffle the order of the options
            const shuffledOptions = question.options.sort(() => 0.5 - Math.random());
            shuffledOptions.forEach(option => {
                const opt = document.createElement('option');
                opt.value = JSON.stringify(option.values); // Store the values as a JSON string
                opt.innerText = option.text;
                select.appendChild(opt);
            });
            questionnaire.insertBefore(select, questionnaire.getElementsByTagName('button')[0]);
        });
    });

function calculateSkills() {
    // Calculate skills based on selected options
    document.querySelectorAll('select').forEach(select => {
        const selectedOption = JSON.parse(select.value); // Parse the JSON string to get the values
        for (const skill in selectedOption) {
            //if (selectedOption[skill] === 0) continue; // Skip if the value is 0
            skills[skill] += selectedOption[skill]; // Update the skills object
            skillCount[skill] += 1; // Count the number of times each skill appears
        }
    });

    // Calculate the average and apply a bonus
    for (const skill in skills) {
        if(skillCount[skill] > 0) {
            skills[skill] = skills[skill] / skillCount[skill]; // Calculate the average
        }else{
            skills[skill] = 0;
        }
        
        // Apply a bonus if certain conditions are met
        /*if (skill === "negotiation" && skills[skill] > 50) {
            skills[skill] = Math.min(100, skills[skill] + 10); // Apply a bonus of 10, ensuring the value does not exceed 100
        }*/
    }

    // Display the results
    const result = document.getElementById('result');
    for (const skill in skills) {
        const p = document.createElement('p');
        p.innerText = `${skill.charAt(0).toUpperCase() + skill.slice(1)}: ${skills[skill]}% - ${getLevel(skills[skill])}`;
        result.appendChild(p);
    }

    document.getElementById('questionnaire').style.display = 'none';
    document.getElementById('result').style.display = 'block';
}

function getLevel(value) {
    if (value < 25) return 'Untrained';
    if (value < 50) return 'Trained';
    if (value < 75) return 'Proficient';
    if (value < 100) return 'Expert';
    if (value === 100) return 'Legend';
    return 'Untrained';
}
