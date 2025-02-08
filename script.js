document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');
    const tasksCounter = document.getElementById('tasks-counter');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const filters = document.querySelectorAll('.filter');

    const API_URL = 'http://localhost:3000/api';
    let tasks = [];

    async function fetchTasks() {
        try {
            const response = await fetch(`${API_URL}/tasks`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            tasks = await response.json();
            renderTasks();
            updateTasksCounter();
        } catch (error) {
            console.error('Error fetching tasks:', error);
            alert('Failed to load tasks. Please check if the server is running.');
        }
    }

    async function addTask(text) {
        if (text.trim() === '') return;

        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newTask = await response.json();
            tasks.unshift(newTask);
            taskList.insertBefore(createTaskElement(newTask), taskList.firstChild);
            updateTasksCounter();
            taskInput.value = '';
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task. Please try again.');
        }
    }

    async function toggleTask(task, completed) {
        try {
            const response = await fetch(`${API_URL}/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            task.completed = completed;
            const li = document.querySelector(`[data-task-id="${task.id}"]`);
            if (li) {
                li.classList.toggle('completed', completed);
            }
            updateTasksCounter();
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task. Please try again.');
        }
    }

    async function deleteTask(task) {
        try {
            const response = await fetch(`${API_URL}/tasks/${task.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            tasks = tasks.filter(t => t.id !== task.id);
            const li = document.querySelector(`[data-task-id="${task.id}"]`);
            if (li) {
                li.remove();
            }
            updateTasksCounter();
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task. Please try again.');
        }
    }

    async function clearCompleted() {
        try {
            await fetch(`${API_URL}/tasks/completed`, {
                method: 'DELETE',
            });
            tasks = tasks.filter(task => !task.completed);
            renderTasks();
            updateTasksCounter();
        } catch (error) {
            console.error('Error clearing completed tasks:', error);
        }
    }

    function updateTasksCounter() {
        const activeTasks = tasks.filter(task => !task.completed).length;
        tasksCounter.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-task-id', task.id);
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <button class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        `;

        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            toggleTask(task, checkbox.checked);
        });

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteTask(task);
        });

        return li;
    }

    function filterTasks(filterType) {
        const taskItems = taskList.querySelectorAll('.task-item');
        taskItems.forEach(item => {
            switch (filterType) {
                case 'all':
                    item.style.display = 'flex';
                    break;
                case 'active':
                    item.style.display = item.classList.contains('completed') ? 'none' : 'flex';
                    break;
                case 'completed':
                    item.style.display = item.classList.contains('completed') ? 'flex' : 'none';
                    break;
            }
        });
    }

    // Event Listeners
    addButton.addEventListener('click', () => addTask(taskInput.value));
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    clearCompletedBtn.addEventListener('click', () => {
        clearCompleted();
    });

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            filterTasks(filter.dataset.filter);
        });
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            taskList.appendChild(createTaskElement(task));
        });
    }

    // Add this to check if server is running
    fetch(`${API_URL}/tasks`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Server not responding');
            }
            console.log('Server is running');
        })
        .catch(error => {
            console.error('Server connection error:', error);
            alert('Cannot connect to server. Please make sure the server is running on port 3000.');
        });

    // Initial load
    fetchTasks();

    const modal = document.getElementById('registrationModal');
    const closeBtn = document.querySelector('.close-btn');
    const registrationForm = document.getElementById('registrationForm');
    const eventNameSpan = document.getElementById('eventName');

    // Function to open modal
    window.openRegistrationModal = function(eventName) {
        modal.style.display = 'block';
        eventNameSpan.textContent = eventName;
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    // Close modal when clicking the close button
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Handle form submission
    registrationForm.onsubmit = function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            eventName: eventNameSpan.textContent,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            college: document.getElementById('college').value,
            teamSize: document.getElementById('teamSize').value
        };

        // Here you would typically send this data to your server
        console.log('Registration submitted:', formData);

        // Show success message
        alert('Registration successful! We will contact you soon.');
        
        // Close modal and reset form
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        registrationForm.reset();
    }

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Add animation to event cards on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.event-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

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

            // Filter events
            eventCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Add confetti effect when registering
function showConfetti() {
    const colors = ['#FF3366', '#33FF99', '#9933FF'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
} 

// Add this at the beginning of your script.js
document.addEventListener('DOMContentLoaded', () => {
    // Create cursor elements
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    cursor.className = 'cursor';
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    // Cursor movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Smooth follow effect
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 10 + 'px';
            cursorFollower.style.top = e.clientY - 10 + 'px';
        }, 100);
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseout', () => {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    });

    document.addEventListener('mouseover', () => {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
    });

    // Add particle effect on click
    document.addEventListener('click', createParticles);

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .event-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
});

// Particle effect function
function createParticles(e) {
    const colors = ['#FF3366', '#33FF99', '#9933FF'];
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position around click
        const angle = (i * 360) / particleCount;
        const distance = Math.random() * 50 + 30;
        const tx = Math.cos(angle * Math.PI / 180) * distance;
        const ty = Math.sin(angle * Math.PI / 180) * distance;
        
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Add this to hide default cursor
document.body.style.cursor = 'none';

// Add this CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Your existing code below...