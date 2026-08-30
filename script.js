
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
    {
        title: "Complete TaskNova Dashboard UI",
        description: "Design and develop dashboard layout.",
        priority: "High",
        completed: false
    },
    {
        title: "Make Responsive Design",
        description: "Optimize for mobile and tablet.",
        priority: "Medium",
        completed: false
    }
];

const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const searchInput = document.getElementById("searchInput");

function renderTasks() {

    
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const div = document.createElement("div");

        div.className = "task";

        div.innerHTML = `
            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})"
            >

            <div>
                <h3>${task.title}</h3>
                <p>${task.description || "No description"}</p>
            </div>

            <span class="${task.priority.toLowerCase()}">
                ${task.priority}
            </span>

            <button
                class="delete-btn"
                onclick="deleteTask(${index})"
                title="Delete Task"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        taskList.appendChild(div);
    });

    updateCards();
    updatePriority();

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", () => {

    const title = prompt("Enter Task Title:");

    if (!title || title.trim() === "") {
        return;
    }

    const description = prompt("Enter Task Description:") || "";

    let priority = prompt(
        "Enter Priority: High / Medium / Low"
    );

    priority = priority
        ? priority.trim().toLowerCase()
        : "low";

   
    priority =
        priority.charAt(0).toUpperCase() +
        priority.slice(1);

    if (
        priority !== "High" &&
        priority !== "Medium" &&
        priority !== "Low"
    ) {
        priority = "Low";
    }


    const newTask = {

        title: title.trim(),

        description: description.trim(),

        priority: priority,

        completed: false

    };


    tasks.push(newTask);

    renderTasks();
});

function deleteTask(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
        return;
    }

    tasks.splice(index, 1);

    renderTasks();
}


function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    renderTasks();
}


searchInput.addEventListener("input", (event) => {

    const searchValue =
        event.target.value.toLowerCase().trim();


    document.querySelectorAll("#taskList .task").forEach(task => {

        const taskText =
            task.innerText.toLowerCase();


        if (taskText.includes(searchValue)) {

            task.style.display = "flex";

        } else {

            task.style.display = "none";

        }

    });

});


function updateCards() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending =
        total - completed;


    const productivity =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);


    document.getElementById("totalTasks").textContent =
        total;

    document.getElementById("completedTasks").textContent =
        completed;

    document.getElementById("pendingTasks").textContent =
        pending;

    document.getElementById("productivity").textContent =
        productivity + "%";
}

function updatePriority() {

    const high =
        tasks.filter(task => task.priority === "High").length;

    const medium =
        tasks.filter(task => task.priority === "Medium").length;

    const low =
        tasks.filter(task => task.priority === "Low").length;


    document.getElementById("highCount").textContent =
        high;

    document.getElementById("mediumCount").textContent =
        medium;

    document.getElementById("lowCount").textContent =
        low;
}



const quotes = [

    "Dream it. Design it. Develop it.",

    "Every pixel has a purpose.",

    "Code today. Create tomorrow.",

    "Build something users love."

];


let quoteIndex = 0;

const quote = document.getElementById("quote");


function changeQuote() {

    quote.textContent =
        quotes[quoteIndex];


    quoteIndex++;

    if (quoteIndex >= quotes.length) {

        quoteIndex = 0;

    }

}


changeQuote();

setInterval(changeQuote, 3000);



renderTasks();