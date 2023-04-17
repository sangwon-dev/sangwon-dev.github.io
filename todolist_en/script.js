function saveToLocalStorage(todoList) {
  const tasks = [];
  for (let i = 0; i < todoList.children.length; i++) {
    const task = {
      text: todoList.children[i].querySelector('span').textContent,
      completed: todoList.children[i]
        .querySelector('span')
        .classList.contains('completed'),
    };
    tasks.push(task);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadFromLocalStorage(todoList) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    tasks.forEach((task) => {
      addNewTask(todoList, task.text, task.completed);
    });
  }
}

document
  .getElementById('addTaskForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const taskInput = document.getElementById('taskInput');
    const todoList = document.getElementById('todoList');
    addNewTask(todoList, taskInput.value, false);
    saveToLocalStorage(todoList);
    taskInput.value = '';
  });

function addNewTask(todoList, taskValue, isCompleted) {
  const newTask = document.createElement('li');

  const taskText = document.createElement('span');
  taskText.textContent = taskValue;
  if (isCompleted) {
    taskText.classList.add('completed');
  }
  newTask.appendChild(taskText);

  const doneButton = document.createElement('button');
  doneButton.textContent = 'Done';
  doneButton.classList.add('done-btn');
  doneButton.addEventListener('click', function () {
    taskText.classList.toggle('completed');
    saveToLocalStorage(todoList);
  });
  newTask.appendChild(doneButton);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('edit-btn');
  editButton.addEventListener('click', function () {
    const newTaskText = prompt('Edit task:', taskText.textContent);
    if (newTaskText) {
      taskText.textContent = newTaskText;
      saveToLocalStorage(todoList);
    }
  });
  newTask.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', function () {
    todoList.removeChild(newTask);
    saveToLocalStorage(todoList);
  });
  newTask.appendChild(deleteButton);

  todoList.appendChild(newTask);
}

loadFromLocalStorage(document.getElementById('todoList'));
