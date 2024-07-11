const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#task");
const error = document.querySelector(".error");

let taskCount = 0;

const displayCount = () => {
    document.querySelector(".count-value").innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        error.style.display = "block";
        setTimeout(() => {
            error.style.display = "none";
        }, 2000);
        return;
    }

    const task = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">
            <i class="uil uil-edit-alt"></i>
        </button>
        <button class="delete">
            <i class="uil uil-trash-alt"></i>
        </button>
    </div>`;
    taskContainer.insertAdjacentHTML("beforeend", task);
    taskCount++;
    displayCount();
    newTaskInput.value = '';

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            if (taskCount > 0) {
                taskCount--;
            }
            displayCount();
        };
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if (!(e.target.className == "edit")) {
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentElement.remove();
            if (taskCount > 0) {
                taskCount--;
            }
            displayCount();
        };
    });

    const taskCheck = document.querySelectorAll(".task-check");
    taskCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            const task = checkBox.parentElement;
            task.classList.toggle("completed", checkBox.checked);
            if (checkBox.checked) {
                if (taskCount > 0) {
                    taskCount--;
                }
            } else {
                taskCount++;
            }
            displayCount();
        };
    });
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = '';
};