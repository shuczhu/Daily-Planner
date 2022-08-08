var container = document.querySelector(".container");
var currentDay = document.getElementById("currentDay");

//Displaying current date and time
currentDay.textContent = dayjs().format('dddd, MMM D YYYY, HH:mm:ss');

setInterval(() => {
    currentDay.textContent = dayjs().format('dddd, MMM D YYYY, HH:mm:ss');
}, 1000);


var taskStorage = JSON.parse(localStorage.getItem("task")) || [];

for (i = 0; i < 9; i++) {
    function createTimeGrid() {
        var horContainer = document.createElement("div");
        horContainer.classList.add("row")

        var time = document.createElement("p");
        time.textContent = i+9 + ":00";
        time.classList.add("time-block", "hour");

        var item = document.createElement("textarea");
        item.classList.add("textarea", "description");
        item.setAttribute("data-id", i);

        if (i < dayjs().hour()) {
            item.classList.add("past")
        } 
        else if (i === dayjs().hour()) {
            item.classList.add("present");
            item.textContent = "current hour";
        } else if (i > dayjs().hour()) {
            item.classList.add("future")
        }

        var save = document.createElement("button");
        save.classList.add("saveBtn","fa","fa-folder");

        save.addEventListener('click', function () {
            var taskText = item.value;
            var time = item.getAttribute("data-id");
            var taskItem = {
                "time": time,
                "task": taskText,
            };
            taskStorage.push(taskItem);
            localStorage.setItem("task", JSON.stringify(taskStorage));
        });

        for (j = 0; j < taskStorage.length; j++) {
            if (taskStorage[j].time == i) {
                item.textContent = taskStorage[j].task;
            }}

        container.appendChild(horContainer);
        horContainer.appendChild(time);
        horContainer.appendChild(item);
        horContainer.appendChild(save);
    }
    createTimeGrid();


    }


