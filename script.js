const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const classList = document.getElementById("classList");
const tabs = document.getElementById("tabs");

let school = {
    "5-А": ["Урок 1"],
};

let currentClass = "5-А";
let currentTopic = "Урок 1";

/* ===== КЛАСИ ===== */

function renderClasses(){

    classList.innerHTML = "";

    Object.keys(school).forEach(name => {

        const div = document.createElement("div");

        div.className =
            name === currentClass
            ? "class-item active"
            : "class-item";

        div.innerText = name;

        div.onclick = () => {

            currentClass = name;
            currentTopic = school[name][0];

            renderClasses();
            renderTabs();
        };

        classList.appendChild(div);

    });
}

function addClass(){

    const name = prompt("Назва класу");

    if(!name) return;

    school[name] = ["Урок 1"];

    renderClasses();
}

/* ===== ТЕМИ ===== */

function renderTabs(){

    tabs.innerHTML = "";

    school[currentClass].forEach(topic => {

        const div = document.createElement("div");

        div.className =
            topic === currentTopic
            ? "tab active"
            : "tab";

        div.innerText = topic;

        div.onclick = () => {

            currentTopic = topic;
            renderTabs();
        };

        tabs.appendChild(div);

    });
}

function addTopic(){

    const topic = prompt("Назва теми");

    if(!topic) return;

    school[currentClass].push(topic);

    renderTabs();
}

/* ===== ДОШКА ===== */

function resizeCanvas(){

    canvas.width = window.innerWidth - 250;
    canvas.height =
        window.innerHeight -
        document.querySelector(".topbar").offsetHeight -
        document.querySelector(".toolbar").offsetHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

let drawing = false;

canvas.addEventListener("mousedown", () => {
    drawing = true;
});

canvas.addEventListener("mouseup", () => {

    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

function draw(e){

    if(!drawing) return;

    const color =
        document.getElementById("color").value;

    const size =
        document.getElementById("size").value;

    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";

    ctx.lineTo(
        e.offsetX,
        e.offsetY
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        e.offsetX,
        e.offsetY
    );
}

function clearBoard(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

function saveBoard(){

    const link =
        document.createElement("a");

    link.download =
        currentClass +
        "-" +
        currentTopic +
        ".png";

    link.href =
        canvas.toDataURL();

    link.click();
}

renderClasses();
renderTabs();
