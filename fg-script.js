// ------- canvas properties ------------------------------------------------------------- A
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

// ------- Sprite properties -------------------------------------------------------------

const gravity = 0.7;

class Sprite {
  constructor({ position, velocity, color = 'red'}) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey
    this.attackBox = {
      position: this.position,
      width: 100, 
      height: 50
    } 
    this.color = color
  }


  // -----------------------------------------DRAW--------------------------------------!
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, 50, this.height);

    // attack box
    c.fillStyle = "green";
    c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
  }


  // -------------------------------------------UPDATE --------------------------------!
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
    x: 950,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'blue'
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

  //-------------------------------------PLAYER X AXIS MOVEMENT-----------------------------------

  if (keys.ArrowLeft.pressed && lastKey === "ArrowLeft") {
    player.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && lastKey === "ArrowRight") {
    player.velocity.x = 5;
  }

  //-------------------------------------ENEMY X AXIS MOVEMENT-------------------------------------

  if (keys.ArrowLeft.pressed && lastKey === "a") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && lastKey === "d") {
    enemy.velocity.x = 5;
  }
}

animate();

// ------- KEY DOWN properties Player -------------------------------------------------------------

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
      player.velocity.y = -20;                       //   |   |
      break;                                         //   |___|



    // ----- KEY DOWN properties ENEMY -----------------------------------------------------------------------
    case "d":
      keys.d.pressed = true;
      enemy.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      enemy.lastKey = "a";
      break;
    case "w":
      enemy.player.velocity.y = -20;
      break;
  }
  console.log(event.key);
});

// ------- KEY UP properties -------------------------------------------------------------
      // player keys:
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

      // enemy keys:
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
  }
  console.log(event.key);
});
