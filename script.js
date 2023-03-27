const canvas = document.getElementById("canvas");
const toolBtns = document.querySelectorAll(".tool");
const ctx = canvas.getContext("2d"); //returns a drawing context on canvas

let prevMouseX,
  prevMouseY,snapshot,
  isDrawing = false,
  selectTool = "Brush",
  brushWidth = 5;

//offsetWidth/height returns viewable width/height of an element
canvas.height = canvas.offsetHeight;
canvas.width = canvas.offsetWidth;

const drawRect = (e) => {
  ctx.strokeRect(e.offsetX, e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY); //strockRect draws a rectangle(x-coordinate,y-coordinate,width,height)
};



canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  ctx.beginPath(); //creats new path to draw
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.lineWidth = brushWidth;
  //coping canvas data & passing as snapshot value... this avoids dragging the image
  snapshot = ctx.getImageData(0,0,canvas.width,canvas.height)
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot,0,0);
  if (selectTool === "Brush") {
    ctx.lineTo(e.offsetX, e.offsetY); //creates a new line (x-coordinate,y-coordinate)  offsetX and Y returns x and y coordinates of mouse poiter
    ctx.stroke(); // filling line with color
  } else if (selectTool === "Rectangle") {
    drawRect(e);
  }
  else if (selectTool === "Circle") {
    drawcircle(e);
  }
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectTool = btn.id;
    console.log(btn.id);
  });
});
