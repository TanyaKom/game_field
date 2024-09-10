const imageRow = [
    "./images/peak.png", "./images/peak.png", "./images/cross.png", "./images/bub.png", "./images/cross.png", "./images/cross.png",
    "./images/peak.png", "./images/peak.png", "./images/cross.png", "./images/bub.png", "./images/bub.png", "./images/bub.png",
    "./images/peak.png", "./images/cross.png", "./images/cross.png","./images/bub.png", "./images/bub.png", "./images/bub.png",
    "./images/peak.png", "./images/cross.png", "./images/cross.png", "./images/cross.png", "./images/cross.png", "./images/bub.png",
    "./images/heart.png", "./images/cross.png", "./images/cross.png", "./images/cross.png","./images/heart.png", "./images/heart.png",
    "./images/heart.png", "./images/heart.png", "./images/cross.png", "./images/cross.png", "./images/bub.png", "./images/cross.png",
    "./images/heart.png", "./images/heart.png", "./images/heart.png",  "./images/peak.png",  "./images/peak.png", "./images/cross.png",
];

const container = document.getElementById("container");
const grid = [];
const columns = 6;
const rows = 7;

imageRow.forEach((imageSrc, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    const img = document.createElement("img");
    img.src = imageSrc;
    cell.appendChild(img);
    
    container.appendChild(cell);

    grid.push({ element: cell, imgSrc: imageSrc });

    cell.addEventListener("mouseover", () => {
        removeHover();
        actionWithCells(index, imageSrc, "hover");
    });
    cell.addEventListener("mouseout", removeHover);

    cell.addEventListener("click", () => {
        actionWithCells(index, imageSrc, "remove");
    });
});

function actionWithCells(index, imageSrc, action) {
    const operation = [];
    const checkedCells = new Set();

    function findCells(index) {
        if(index < 0 || index >= grid.length || checkedCells.has(index)) {
            return;
    }
    const cell = grid[index];
        if(cell.imgSrc !== imageSrc) {
            return;
        }
        operation.push(index);
        checkedCells.add(index);

        const closestCells = [
            index - 1,
            index + 1,
            index - columns,
            index + columns
        ];
        closestCells.forEach(closestCellsIndex => {
            if(closestCellsIndex >= 0 && closestCellsIndex < grid.length && !checkedCells.has(closestCellsIndex)) {
                findCells(closestCellsIndex);
            }
        });
    }

    findCells(index);

    if(action === "hover") {
        operation.forEach(index => {
            grid[index].element.classList.add("hover");
        });

    } else if (action === "remove") {
        operation.forEach(index => {
            const cell = grid[index];
            cell.element.querySelector("img").style.display = "none";
            cell.imgSrc = null;
        });
    }
}
function removeHover() {
    document.querySelectorAll(".hover").forEach(cell => {
        cell.classList.remove("hover");
    });
}