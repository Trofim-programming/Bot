// Telegram Web App API
const tg = window.Telegram.WebApp;

// Установить никнейм пользователя в интерфейсе
document.getElementById("username").textContent = tg.initDataUnsafe.user.username;
document.getElementById("profile-username").textContent = tg.initDataUnsafe.user.username;

// Локальные данные конференций
let conferences = [];

// Функция добавления конференции
function addConference() {
    const conferenceName = prompt("Enter conference name:");
    const conferenceDate = prompt("Enter date (YYYY-MM-DD HH:mm):");

    if (conferenceName && conferenceDate) {
        const conference = {
            name: conferenceName,
            date: new Date(conferenceDate),
            timer: null
        };
        conferences.push(conference);
        updateConferenceList();
    }
}

// Обновить список конференций и добавить таймер
function updateConferenceList() {
    const list = document.getElementById("conference-list");
    list.innerHTML = "";

    conferences.forEach((conf, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${conf.name} - ${formatTime(conf.date)}`;
        
        // Создать таймер
        const timerElement = document.createElement("span");
        timerElement.id = `timer-${index}`;
        listItem.appendChild(timerElement);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            conferences.splice(index, 1);
            updateConferenceList();
        };

        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);

        // Обновление таймера каждую секунду
        conf.timer = setInterval(() => updateTimer(conf, index), 1000);
    });
}

// Форматирование времени
function formatTime(conferenceDate) {
    const now = new Date();
    const diff = conferenceDate - now;

    if (diff <= 0) {
        return "Conference has started!";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
}

// Обновить таймер на экране
function updateTimer(conference, index) {
    const timerElement = document.getElementById(`timer-${index}`);
    timerElement.textContent = ` - Time left: ${formatTime(conference.date)}`;
}

// Обработчик изменения юзернейма
document.getElementById("edit-username-btn").addEventListener("click", () => {
    document.getElementById("edit-username").style.display = "block";
});

document.getElementById("save-username-btn").addEventListener("click", () => {
    const newUsername = document.getElementById("new-username").value;
    if (newUsername) {
        tg.sendData({ username: newUsername });
        document.getElementById("profile-username").textContent = newUsername;
        document.getElementById("edit-username").style.display = "none";
    }
});

// Навесить обработчик на кнопку добавления конференции
document.getElementById("add-conference-btn").addEventListener("click", addConference);

// Инициализация интерфейса
tg.ready();
