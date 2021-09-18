const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const add = document.querySelector(".add-to-do i");

const CHECK = "fas fa-check-circle ch co";
const UNCHECK = "far fa-circle co";
const line_Through = "lineThrough";

let LIST, id;

let data = localStorage.getItem("TODO");

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener("click", function() {
    if (id != 0 && window.confirm("Are you sure you want to clear all your tasks?")) {
        localStorage.clear();
        location.reload();
    }
    if (id == 0) {
        alert("Your todo list is empty");
    }
});

const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(todo, id, done, trash) {
    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? line_Through : "";
    const item = `<li class="item"> <i class="${DONE}" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${todo}</p>
    <i class="fas fa-trash de" job="delete" id="${id}"></i> </li>`;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });

            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});
add.addEventListener("click", function() {
    const toDo = input.value;
    if (toDo) {
        addToDo(toDo, id, false, false);

        LIST.push({
            name: toDo,
            id: id,
            done: false,
            trash: false,
        });

        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
    }
    input.value = "";
});


function completeToDo(element) {
    element.classList.toggle("fa-check-circle");
    element.classList.toggle("fas");
    element.classList.toggle("ch");
    element.classList.toggle("fa-circle");
    element.classList.toggle("far");
    console.log(element.classList);
    element.parentNode.querySelector(".text").classList.toggle(line_Through);
    const ind = element.attributes.id.value;
    let data = localStorage.getItem("TODO");
    const val = LIST.findIndex((x) => x.id == ind);
    LIST[val].done = LIST[val].done ? false : true;
    localStorage.setItem("TODO", JSON.stringify(LIST));


}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    const ind = element.attributes.id.value;
    const val = LIST.findIndex((x) => x.id == ind);

    LIST.splice(val, 1);
    localStorage.setItem("TODO", JSON.stringify(LIST));

}

list.addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;



    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

});