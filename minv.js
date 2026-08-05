
 let selectedBlock = null;
const world = document.getElementById("world");


const width = 30;
const height = 20;

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

        const block = document.createElement("div");

  
        if (y === height - 4) {
            block.className = "snowy_grass";
        }
      
        else if (y > height - 4) {
            block.className = "dirt_block";
        }

        else {
            block.className = "air_block";
        }

        block.addEventListener("click", () => {
           if (block.classList.contains("air_block") && selectedBlock) {

    block.className = selectedBlock;

    const item = inventory.find(i => i.item === selectedBlock);

    if (item) {
        item.quantity--;

        if (item.quantity <= 0) {
            const index = inventory.indexOf(item);
            inventory.splice(index, 1);
            selectedBlock = null;
        }

        updateInventoryUI();
    }

    return;
}

            if (
                block.classList.contains("snowy_grass") ||
                block.classList.contains("dirt_block") ||
                block.classList.contains("log") ||
                block.classList.contains("leaves") ||
                block.classList.contains("coal_ore") ||
                block.classList.contains("gold_ore") ||
                block.classList.contains("diamond_ore") ||
                block.classList.contains("emerald_ore")
            ) {
                if (block.classList.contains("snowy_grass")) {
                    if (selectedTool !== "shovel") return
                    addToInventory("snowy_grass", "imgs/Snowy_grass.webp");
                    block.className = "air_block";

                }
                }
                if (block.classList.contains("dirt_block")) {
                    if (selectedTool !== "shovel") return
                    addToInventory("dirt_block" ,"imgs/dirt.webp");
                    block.className = "air_block";
                }
                if (block.classList.contains("log")) {
                    if (selectedTool !== "axe") return
                    addToInventory("log","imgs/log.webp");
                    block.className = "air_block";
                }
                if (block.classList.contains("leaves")) {
                    if (selectedTool !== "axe") return
                    addToInventory("leaves","imgs/Cherry_Leaves_29_JE2.webp");
                    block.className = "air_block";
                }
            if (block.classList.contains("diamond_ore")) {
                if(selectedTool !=="pickaxe")return
    addToInventory("diamond_ore","imgs/dimond.webp");
    block.className="air_block";
}

if (block.classList.contains("gold_ore")) {
     if(selectedTool !=="pickaxe")return
    addToInventory("gold_ore", "imgs/Gold_Ore_29_JE7_BE4.webp");
   block.className="air_block";}

if (block.classList.contains("emerald_ore")) {
   if(selectedTool !=="pickaxe")return
    addToInventory("emerald_ore", "imgs/Emerald.webp");
       block.className="air_block";
}


                

        });

        world.appendChild(block);
    }
}
function generateOre(className, amount) {

    for (let i = 0; i < amount; i++) {

        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * 3) + (height - 3);

        const block = document.querySelector(
            `#world div:nth-child(${y * width + x + 1})`
        );

        if (block && block.classList.contains("dirt_block")) {
            block.className = className;
        }
    }
}

generateOre("gold_ore", 8);
generateOre("diamond_ore", 5);
generateOre("emerald_ore", 3);


function createTree(x, y) {

    
    for (let i = 0; i < 5; i++) {

        const log = document.querySelector(
            `#world div:nth-child(${(y - i) * width + x + 1})`
        );

        if (log) {
            log.className = "log";
        }
    }

    const leaves = [
        [-1,-8],[0,-8],[1,-8],

        [-2,-7],[-1,-7],[0,-7],[1,-7],[2,-7],

        [-2,-6],[-1,-6],[0,-6],[1,-6],[2,-6],

        [-1,-5],[0,-5],[1,-5],

    ];

    leaves.forEach(([dx, dy]) => {

        const leaf = document.querySelector(
            `#world div:nth-child(${(y + dy) * width + (x + dx) + 1})`
        );

        if (leaf) {
            leaf.className = "leaves";
        }

    });

}


const treeCount = 3;
const treePositions = [];

for (let i = 0; i < treeCount; i++) {

    let x;

    do {
        x = Math.floor(Math.random() * (width - 8)) + 4;
    } while (treePositions.some(pos => Math.abs(pos - x) < 6));

    treePositions.push(x);

    createTree(x, height - 4);
}
let selectedTool = "pickaxe";
document.addEventListener("keydown", (event) => {
    if (event.key === "1") {
        selectedTool = "pickaxe";
    }
    if (event.key === "2") {
        selectedTool = "axe";
    }   
        if (event.key === "3") {
        selectedTool = "shovel";
    }
    if (event.key === "4") {
        selectedTool = "sword";
    }
}); 
const tool1 = document.getElementById("tool1");
const tool2 = document.getElementById("tool2");
const tool3 = document.getElementById("tool3");
const tool4 = document.getElementById("tool4");
const tools = [tool1, tool2, tool3, tool4];

function selectTool(index) {
    tools.forEach((tool => tool.classList.remove("selected")));
    tools[index].classList.add("selected");
}
document.addEventListener("keydown", (event) => {
    if (event.key === "1") {
        selectTool(0);
    }
    if (event.key === "2") {
        selectTool(1);
    }
    if (event.key === "3") {
        selectTool(2);
    }
    if (event.key === "4") {
        selectTool(3);
    }
});


const inventory=[];

function addToInventory(item,image) {
const existing= inventory.find(i=>i.item===item);
if(existing){
existing.quantity++;
}else{
inventory.push({item:item,quantity:1,image:image});
};
updateInventoryUI();
}
function updateInventoryUI(){
const inventoryDiv=document.getElementById("inventory");
inventoryDiv.innerHTML="";
inventory.forEach(item => {
const slot = document.createElement("div");
slot.className = "slot";
const img = document.createElement("img");
img.src = item.image;
slot.appendChild(img);
slot.onclick = () => {

    document.querySelectorAll(".slot").forEach(s => {
        s.style.border = "2px solid #333";
    });

    slot.style.border = "3px solid yellow";

    selectedBlock = item.item;
};

const count = document.createElement("span");
count.textContent = item.quantity;

count.style.position = "absolute";
count.style.bottom = "2px";
count.style.right = "4px";
count.style.color = "white";
count.style.fontWeight = "bold";
count.style.fontSize = "18px";
count.style.textShadow = "1px 1px 2px black";

slot.style.position = "relative";
slot.appendChild(count);
inventoryDiv.appendChild(slot);
});
}
const player = document.getElementById("player");

let playerX = 300;
let playerY = 256;

document.addEventListener("keydown",(e)=>{

    if(e.key==="a"){
        playerX -= 64;
    }

    if(e.key==="d"){
        playerX += 64;
    }

    if(e.key==="w"){
        playerY += 64;
    }

    if(e.key==="s"){
        playerY -= 64;
    }

    player.style.left = playerX + "px";
    player.style.bottom = playerY + "px";

});
