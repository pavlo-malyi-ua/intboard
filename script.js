const school = {
    "5-А": {
        "Математика": [
            "Дроби",
            "Рівняння"
        ]
    }
};

let currentClass = "5-А";
let currentSubject = "Математика";
let currentTopic = "Дроби";

const classList = document.getElementById("classList");
const subjectsDiv = document.getElementById("subjects");
const topicsDiv = document.getElementById("topics");

/* Класи */

function renderClasses(){

    classList.innerHTML = "";

    Object.keys(school).forEach(cls =>{

        const el = document.createElement("div");

        el.className =
            cls === currentClass
            ? "class-item active"
            : "class-item";

        el.innerText = cls;

        el.onclick = ()=>{

            currentClass = cls;

            currentSubject =
                Object.keys(school[cls])[0];

            currentTopic =
                school[cls][currentSubject][0];

            renderAll();
        };

        classList.appendChild(el);
    });
}

function addClass(){

    const name = prompt("Назва класу");

    if(!name) return;

    school[name] = {
        "Новий предмет":[
            "Нова тема"
        ]
    };

    renderAll();
}

/* Предмети */

function renderSubjects(){

    subjectsDiv.innerHTML = "";

    Object.keys(
        school[currentClass]
    ).forEach(subject =>{

        const el =
            document.createElement("div");

        el.className =
            subject === currentSubject
            ? "tab active"
            : "tab";

        el.innerText = subject;

        el.onclick = ()=>{

            currentSubject = subject;

            currentTopic =
            school[currentClass][subject][0];

            renderAll();
        };

        subjectsDiv.appendChild(el);
    });
}

function addSubject(){

    const name =
        prompt("Назва предмета");

    if(!name) return;

    school[currentClass][name] = [
        "Нова тема"
    ];

    renderAll();
}

/* Теми */

function renderTopics(){

    topicsDiv.innerHTML = "";

    school[currentClass][currentSubject]
    .forEach(topic=>{

        const el =
            document.createElement("div");

        el.className =
            topic === currentTopic
            ? "tab active"
            : "tab";

        el.innerText = topic;

        el.onclick = ()=>{

            currentTopic = topic;

            renderTopics();
        };

        topicsDiv.appendChild(el);
    });
}

function addTopic(){

    const name =
        prompt("Назва теми");

    if(!name) return;

    school[currentClass]
    [currentSubject]
    .push(name);

    renderTopics();
}

/* Дошка */

const canvas =
document.getElementById("board");

const ctx =
canvas.getContext("2d");

function resizeCanvas(){

    canvas.width =
        window.innerWidth - 260;

    canvas.height =
        window.innerHeight -
        140;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

let drawing = false;

canvas.addEventListener(
"mousedown",
()=>drawing = true);

canvas.addEventListener(
"mouseup",
()=>{
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener(
"mousemove",
e=>{

    if(!drawing) return;

    ctx.strokeStyle =
    document.getElementById("color").value;

    ctx.lineWidth =
    document.getElementById("size").value;

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
});

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
        `${currentClass}-${currentSubject}-${currentTopic}.png`;

    link.href =
        canvas.toDataURL();

    link.click();
}

/* Рендер */

function renderAll(){

    renderClasses();
    renderSubjects();
    renderTopics();
}

renderAll();
