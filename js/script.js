// --- 1. GREETING & WAKTU ---
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('time-display').innerText = `${hours}:${minutes}:${seconds}`;

    let greeting = "Selamat Malam";
    if (hours >= 4 && hours < 11) {
        greeting = "Selamat Pagi";
    } else if (hours >= 11 && hours < 15) {
        greeting = "Selamat Siang";
    } else if (hours >= 15 && hours < 18) {
        greeting = "Selamat Sore";
    }
    document.getElementById('greeting-text').innerText = greeting;
}
setInterval(updateClock, 1000);
updateClock();


// --- 2. FOCUS TIMER (25 Menit) ---
let timerMinutes = 25;
let timerSeconds = 0;
let timerInterval = null;

const timerDisplay = document.getElementById('timer-display');

function updateTimerDisplay() {
    let m = String(timerMinutes).padStart(2, '0');
    let s = String(timerSeconds).padStart(2, '0');
    timerDisplay.innerText = `${m}:${s}`;
}

document.getElementById('start-btn').addEventListener('click', () => {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        if (timerSeconds === 0) {
            if (timerMinutes === 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                alert('Waktu fokus selesai! Istirahat sejenak.');
                return;
            }
            timerMinutes--;
            timerSeconds = 59;
        } else {
            timerSeconds--;
        }
        updateTimerDisplay();
    }, 1000);
});

document.getElementById('stop-btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerMinutes = 25;
    timerSeconds = 0;
    updateTimerDisplay();
});


// --- 3. TO-DO LIST & LOCAL STORAGE ---
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div style="display:inline-block; margin-left:10px;">
                <button onclick="toggleTask(${index})">${task.completed ? 'Batal' : 'Selesai'}</button>
                <button onclick="deleteTask(${index})" style="background-color: #dc3545;">Hapus</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        todoInput.value = '';
        saveTasks();
        renderTasks();
    }
});

window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
};

window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
};

renderTasks();
