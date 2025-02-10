let currentEvent = null;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event');

    if (eventId && eventsData[eventId]) {
        currentEvent = eventsData[eventId];
        populateEventDetails(currentEvent);
    } else {
        window.location.href = 'events.html';
    }
});

function populateEventDetails(event) {
    document.title = `${event.title} - CSEUTSAV '25`;
    
    // Set hero section
    document.getElementById('eventImage').style.backgroundImage = `url('${event.image}')`;
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDate').innerHTML = `<i class="fas fa-calendar"></i> ${event.date}`;
    document.getElementById('eventTime').innerHTML = `<i class="fas fa-clock"></i> ${event.time}`;
    document.getElementById('eventVenue').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${event.venue}`;
    
    // Set description
    document.getElementById('eventDescription').textContent = event.description;
    
    // Set rules
    const rulesList = document.getElementById('eventRules');
    event.rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        rulesList.appendChild(li);
    });
    
    // Set requirements
    const reqList = document.getElementById('eventRequirements');
    event.requirements.forEach(req => {
        const li = document.createElement('li');
        li.textContent = req;
        reqList.appendChild(li);
    });
    
    // Set prizes
    const prizesDiv = document.getElementById('eventPrizes');
    prizesDiv.innerHTML = `
        <div class="prize first">1st Prize: ${event.prizes.first}</div>
        <div class="prize second">2nd Prize: ${event.prizes.second}</div>
        <div class="prize third">3rd Prize: ${event.prizes.third}</div>
    `;
    
    // Set coordinators
    const coordList = document.getElementById('eventCoordinators');
    event.coordinators.forEach(coord => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${coord.name}</strong><br>
                ${coord.role}<br>
                <a href="tel:${coord.phone}">${coord.phone}</a>
            </div>
        `;
        coordList.appendChild(li);
    });
} 