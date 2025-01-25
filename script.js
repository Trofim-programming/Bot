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
        conferences.push({ name: conferenceName, date: conferenceDate });
        updateConferenceList();
    }
}

// Обновить список конференций в интерфейсе
function updateConferenceList() {
    const list = document.getElementById("conference-list");
    list.innerHTML = "";

    conferences.forEach((conf, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${conf.name} - ${conf.date}`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            conferences.splice(index, 1);
            updateConferenceList();
        };
        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
    });
}

// Навесить обработчик на кнопку
document.getElementById("add-conference-btn").addEventListener("click", addConference);

// Инициализация интерфейса
tg.ready();
