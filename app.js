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
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
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

document.addEventListener("keyup", function (event) {
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
add.addEventListener("click", function () {
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

//addToDo('cofee', 1, true, false);
function completeToDo(element) {
  element.classList.toggle("fa-check-circle");
  element.classList.toggle("fas");
  element.classList.toggle("fa-circle");
  element.classList.toggle("far");
  console.log(element.classList);
  element.parentNode.querySelector(".text").classList.toggle(line_Through);

  //let i = LIST.indexOf(element);
  // console.log(id);
  // console.log(i);

  //const val = LIST.indexOf(element.id);
  //console.log(val);
  //console.log(LIST[0].name);

  const ind = element.attributes.id.value;
  let data = localStorage.getItem("TODO");
  const val = LIST.findIndex((x) => x.id == ind);
  //   console.log(val);
  LIST[val].done = LIST[val].done ? false : true;
  localStorage.setItem("TODO", JSON.stringify(LIST));

  //LIST = JSON.parse(data);
  //LIST[ind].done = true;
  //LIST[i].done = true;
  //LIST[0].done = true;

  //let data = localStorage.getItem("TODO");
  //   console.log(data);
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  //LIST[element].trash = true;
  //let ind = LIST.indexOf(element);
  const ind = element.attributes.id.value;
  //console.log(ind);
  const val = LIST.findIndex((x) => x.id == ind);
  //console.log(val);

  LIST.splice(val, 1);
  localStorage.setItem("TODO", JSON.stringify(LIST));
  //   console.log(LIST);

  // localStorage.removeItem("TODO", LIST[element]);
}

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  //   console.log(element);
  //   console.log(elementJob);

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  // localStorage.setItem("TODO", JSON.stringify(LIST));
});
//addToDo('cofee', 1, true, false);
