document.addEventListener('DOMContentLoaded', () => {
    // Event category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const eventCards = document.querySelectorAll('.event-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            // Filter events with animation
            eventCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Modal functionality
    const modal = document.getElementById('registrationModal');
    const closeBtn = document.querySelector('.close-btn');
    const eventNameSpan = document.getElementById('eventName');

    window.openRegistrationModal = function(eventName) {
        modal.style.display = 'block';
        eventNameSpan.textContent = eventName;
    }

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}); 