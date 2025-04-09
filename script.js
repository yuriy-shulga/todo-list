const input = document.querySelector('.task-input');
const addTaskBtn = document.querySelector('.add-task');
const taskList = document.querySelector('.task-list');

function createTask(id, text, isComplete) {
  const completeClass = isComplete ? 'complete ' : '';

  return `
  <li data-key="${id}" class="${completeClass}task-item" title="${text}">
  <span class="task-item-title">${text}</span>
  <div class="task-actions">
  <button type="button" class="complete-task">🗸</button>
  <button type="button" class="delete-task">✗</button>
  </div>
  </li>
  `;
}

function getTasks() {
  return JSON.parse(window.localStorage.getItem('tasks')) ?? [];
}

function loadTasks() {
  const tasks = getTasks();
  taskList.innerHTML = '';
  tasks.forEach(({ id, description, isComplete }) => {
    taskList.insertAdjacentHTML('beforeend', createTask(id, description, isComplete));
  });
}

function addTaskToLocaleStorage(task) {
  const tasks = getTasks();
  tasks.unshift({ description: task, isComplete: false, id: Date.now() });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const textInput = input.value.trim();

  if (!textInput) return;
  addTaskToLocaleStorage(textInput);
  loadTasks();
  input.value = '';
}

function changeStatusTask(key) {
  const tasks = getTasks();
  const newTask = tasks.map(({ id, description, isComplete }) => {
    if (key === id.toString()) {
      return { id, description, isComplete: !isComplete };
    }

    return { id, description, isComplete };
  });

  localStorage.setItem('tasks', JSON.stringify(newTask));
}

function deleteTask(key) {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(({ id }) => key.toString() !== id.toString());
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

taskList.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;

  if (e.target.classList.contains('complete-task')) {
    changeStatusTask(li.dataset.key);
    loadTasks();
    return;
  }

  if (e.target.classList.contains('delete-task')) {
    deleteTask(li.dataset.key);
    loadTasks();
    return;
  }

  changeStatusTask(e.target.dataset.key);
  loadTasks();
});

addTaskBtn.addEventListener('click', addTask);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

loadTasks();
