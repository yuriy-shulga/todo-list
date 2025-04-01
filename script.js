const input = document.querySelector('.task-input');
const addTaskBtn = document.querySelector('.add-task');
const taskList = document.querySelector('.task-list');

function createTask(text) {
  return `
    <li class="task-item" title="${text}">
      <span class="task-item-title">${text}</span>
      <div class="task-actions">
        <button type="button" class="complete-task">🗸</button>
        <button type="button" class="delete-task">✗</button>
      </div>
    </li>
  `;
}

function addTask() {
  const textInput = input.value.trim();

  if (!textInput) return;
  taskList.insertAdjacentHTML('afterbegin', createTask(textInput));
  input.value = '';
}

taskList.addEventListener('click', (e) => {
  if (e.target.classList.value.includes('complete-task')) {
    const li = e.target.closest('li');
    li.classList.toggle('complete');
  }

  if (e.target.classList.value.includes('delete-task')) {
    const li = e.target.closest('li');
    li.remove();
  }

  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('complete');
  }
});

addTaskBtn.addEventListener('click', addTask);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
