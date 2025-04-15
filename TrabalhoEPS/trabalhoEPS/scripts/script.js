let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  renderCalendar();
});

document.getElementById('task-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('task-title').value;
  const date = document.getElementById('task-date').value;
  const status = document.getElementById('task-status').value;
  const comment = document.getElementById('task-comment').value;

  const task = {
    id: Date.now(),
    title,
    date,
    status,
    comment
  };

  taskList.push(task);
  saveTasks();
  renderTasks();
  renderCalendar();
  this.reset();
});

function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  taskList.forEach(task => {
    const item = document.createElement('li');
    item.className = `task-item status-${task.status.toLowerCase().replace(/\s/g, '-')}`;
    item.innerHTML = `
      <strong>${task.title}</strong><br/>
      <small>Data: ${formatDate(task.date)}</small><br/>
      <small>Status: ${task.status}</small><br/>
      <em>${task.comment}</em>
      <div class="actions">
        <button onclick="editTask(${task.id})">Editar</button>
        <button onclick="deleteTask(${task.id})">Excluir</button>
      </div>
    `;
    list.appendChild(item);
  });
}

function deleteTask(id) {
  if (confirm("Deseja realmente excluir esta tarefa?")) {
    taskList = taskList.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    renderCalendar();
  }
}

function editTask(id) {
  const task = taskList.find(t => t.id === id);
  if (task) {
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-date').value = task.date;
    document.getElementById('task-status').value = task.status;
    document.getElementById('task-comment').value = task.comment;

    deleteTask(id); // Remove a antiga para ser recriada ao enviar
  }
}

function saveTasks() {
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

function renderCalendar() {
  const calendar = document.getElementById('calendar');
  if (!calendar) return;

  const groupedByDate = {};

  taskList.forEach(task => {
    if (!groupedByDate[task.date]) {
      groupedByDate[task.date] = [];
    }
    groupedByDate[task.date].push(task);
  });

  let html = '<h3>Calendário de Tarefas</h3>';

  const sortedDates = Object.keys(groupedByDate).sort();

  sortedDates.forEach(date => {
    html += `<div class="calendar-day">
      <strong>${formatDate(date)}</strong>
      <ul>
        ${groupedByDate[date].map(t => `
          <li class="status-${t.status.toLowerCase().replace(/\s/g, '-')}">
            ${t.title} (${t.status})
          </li>
        `).join('')}
      </ul>
    </div>`;
  });

  calendar.innerHTML = html;
}

function formatDate(dateStr) {
  const [yyyy, mm, dd] = dateStr.split("-");
  return `${dd}/${mm}/${yyyy}`;
}
