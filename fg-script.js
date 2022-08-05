// ------- canvas properties ------------------------------------------------------------- A
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

// ------- Sprite properties -------------------------------------------------------------

const gravity = 0.2;

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
  position: {
    x: 974,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

// ------- Animation properties -------------------------------------------------------------

const keys = {
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

let lastKey;

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;

  if (keys.ArrowLeft.pressed && lastKey === "ArrowLeft") {
    player.velocity.x = -1;
  } else if (keys.ArrowRight.pressed && lastKey === "ArrowRight") {
    player.velocity.x = 1;
  }
}

animate();

// ------- KEY DOWN properties -------------------------------------------------------------

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      lastKey = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;                 //  ____
      lastKey = "ArrowRight";                         // /_   |
      break;                                          //  |   |
    case "ArrowUp":                                   //  |   |
      player.velocity.y = -10;                       //   |   |
      break;                                         //   |___|

    // enemy movement -----------------------------------------------------------------------
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "w":
      player.velocity.y = -10;
      break;
  }
  console.log(event.key);
});

// ------- KEY UP properties -------------------------------------------------------------

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
  console.log(event.key);
});
