document.addEventListener('DOMContentLoaded', () => {
    const usernameElement = document.getElementById('username');
    const profileUsernameElement = document.getElementById('profile-username');
    const editUsernameBtn = document.getElementById('edit-username-btn');
    const saveUsernameBtn = document.getElementById('save-username-btn');
    const newUsernameInput = document.getElementById('new-username');
    const addConferenceBtn = document.getElementById('add-conference-btn');
    const conferenceList = document.getElementById('conference-list');
    
    const conferenceModal = document.getElementById('conference-modal');
    const conferenceTitleInput = document.getElementById('conference-title');
    const conferenceDateInput = document.getElementById('conference-date');
    const saveConferenceBtn = document.getElementById('save-conference-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    let username = 'DefaultUser';
    
    // Update username highlights
    function updateUsernameDisplay() {
        usernameElement.textContent = username;
        profileUsernameElement.textContent = username;
    }

    // Edit username functionality
    editUsernameBtn.addEventListener('click', () => {
        document.getElementById('edit-username').style.display = 'block';
    });

    saveUsernameBtn.addEventListener('click', () => {
        username = newUsernameInput.value;
        newUsernameInput.value = '';
        document.getElementById('edit-username').style.display = 'none';
        updateUsernameDisplay();
    });

    // Add Conference functionality
    addConferenceBtn.addEventListener('click', () => {
        conferenceModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        conferenceModal.style.display = 'none';
    });

    saveConferenceBtn.addEventListener('click', () => {
        const title = conferenceTitleInput.value;
        const date = new Date(conferenceDateInput.value);
        conferenceTitleInput.value = '';
        conferenceDateInput.value = '';


conferenceModal.style.display = 'none';

        // Create new conference item
        const li = document.createElement('li');
        li.textContent = `${title} - Starts in: ${calculateCountdown(date)}`;
        conferenceList.appendChild(li);

        const countdown = setInterval(() => {
            const diff = date - new Date();
            if (diff <= 0) {
                li.textContent = `${title} - This conference has started!`;
                clearInterval(countdown);
            } else {
                li.textContent = `${title} - Starts in: ${calculateCountdown(date)}`;
            }
        }, 1000);
    });

    // Function to calculate countdown
    function calculateCountdown(date) {
        const seconds = Math.floor((date - new Date()) / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    }
    
    updateUsernameDisplay();
});
...
