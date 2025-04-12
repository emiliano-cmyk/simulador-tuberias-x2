let valves = [false, false];
let explosionTimeout = null;
let exploded = false;

const clickSound = new Audio("sounds/click.mp3");
const waterSound = new Audio("sounds/water.mp3");
const explosionSound = new Audio("sounds/explosion.mp3");

function toggleValve(num) {
  if (exploded) return;

  valves[num - 1] = !valves[num - 1];
  clickSound.play();
  updateFlow();
}

function updateFlow() {
  const mainPipe = document.getElementById("mainPipe");
  const flowText = document.getElementById("flowText");

  const oldFlow = document.querySelector(".flow-animation");
  if (oldFlow) oldFlow.remove();

  const flow = valves.filter(Boolean).length;

  if (flow === 0) {
    mainPipe.style.backgroundColor = "#505050";
    flowText.textContent = "Sin flujo";
    waterSound.pause();
    waterSound.currentTime = 0;
    clearTimeout(explosionTimeout);
  }

  if (flow === 1) {
    mainPipe.style.backgroundColor = "#0077cc";
    flowText.textContent = "Flujo parcial";
    mainPipe.appendChild(createFlowAnimation());
    waterSound.play();
    clearTimeout(explosionTimeout);
  }

  if (flow === 2) {
    mainPipe.style.backgroundColor = "#00ccff";
    flowText.textContent = "Flujo completo";
    mainPipe.appendChild(createFlowAnimation());
    waterSound.play();

    explosionTimeout = setTimeout(triggerExplosion, 5000);
  }
}

function createFlowAnimation() {
  const flowDiv = document.createElement("div");
  flowDiv.classList.add("flow-animation");
  return flowDiv;
}

function triggerExplosion() {
  if (valves.filter(Boolean).length === 2) {
    exploded = true;

    const mainPipe = document.getElementById("mainPipe");
    const flowText = document.getElementById("flowText");

    explosionSound.play();
    waterSound.pause();

    mainPipe.style.backgroundColor = "red";
    mainPipe.classList.add("shake");
    flowText.textContent = "¡EXPLOSIÓN!";

    setTimeout(() => {
      mainPipe.innerHTML = "<span style='color:white;'>Sistema dañado</span>";
    }, 2000);
  }
}
