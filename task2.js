const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks

function renderTasks(){
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement('li');

        li.textContent = task.text;
        li.dataset.id = task.id;

        if(task.completed){
            li.classList.add('completed');
        }

        // Toggle complete
        li.addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = "X";

        delBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent toggle
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

// Save to localStorage
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task
addBtn.addEventListener('click', () => {
    const text = input.value.trim();

    if(text === "") return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    input.value = "";
});

// Load tasks on start
renderTasks();