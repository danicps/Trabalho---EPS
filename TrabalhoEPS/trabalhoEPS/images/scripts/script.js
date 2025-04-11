function addTask() {
    const input = document.getElementById("task-input");
    const taskText = input.value.trim();
  
    if (taskText === "") {
      alert("Digite uma tarefa!");
      return;
    }
  
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = taskText;
  
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
    });
  
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm btn-delete";
    deleteBtn.textContent = "Excluir";
    deleteBtn.onclick = () => li.remove();
  
    li.appendChild(deleteBtn);
    document.getElementById("task-list").appendChild(li);
  
    input.value = "";
  }
  