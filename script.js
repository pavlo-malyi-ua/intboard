const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("color");
const sizePicker = document.getElementById("size");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 60;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

let drawing = false;

function startDrawing() {
    drawing = true;
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(x, y) {

    if (!drawing) return;

    ctx.lineWidth = sizePicker.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = colorPicker.value;

    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
}

/* ПК */

canvas.addEventListener("mousedown", startDrawing);

canvas.addEventListener("mouseup", stopDrawing);

canvas.addEventListener("mouseout", stopDrawing);

canvas.addEventListener("mousemove", (e) => {

    draw(
        e.offsetX,
        e.offsetY
    );

});

/* Телефон */

canvas.addEventListener("touchstart", () => {
    drawing = true;
});

canvas.addEventListener("touchend", stopDrawing);

canvas.addEventListener("touchmove", (e) => {

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    const x =
        e.touches[0].clientX -
        rect.left;

    const y =
        e.touches[0].clientY -
        rect.top;

    draw(x, y);

});

/* Функції */

function clearBoard() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

function eraser() {

    colorPicker.value = "#ffffff";
}

function saveBoard() {

    const link =
        document.createElement("a");

    link.download = "intboard.png";

    link.href =
        canvas.toDataURL("image/png");

    link.click();
}
