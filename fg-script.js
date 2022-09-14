// ------- canvas properties ------------------------------------------------------------- A
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

// ------- Sprite properties -------------------------------------------------------------

const gravity = 0.7;

class Sprite {
  constructor({ position, velocity, color = 'red', offset}) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 100, 
      height: 50
    } 
    this.color = color
    this.isAttacking
    this.health = 100
  }


  // -----------------------------------------DRAW--------------------------------------!
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // --------------------------------------ATTACK BOX --------------------------------
    
    if (this.isAttacking) {
    c.fillStyle = "green";
    c.fillRect(
      this.attackBox.position.x, 
      this.attackBox.position.y, 
      this.attackBox.width, 
      this.attackBox.height
      )
    }
  }


  // -------------------------------------------UPDATE --------------------------------!
  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, 100)
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
  color: 'red',
  offset: {
    x: 0,
    y: 0
  }
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
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  }
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
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  w: {
    pressed: false,
  }
  
};

// -------------------------------------------FUNCTIONS --------------------------------------------


function rectangularCollision({rectangle1, rectangle2}) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}

let timer = 10;
function decreaseTimer() {
  setTimeout(decreaseTimer, 1000)
  if (timer > 0) {
      timer--
      document.querySelector('#timer').innerHTML = timer
}
}

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x =0;

  //-------------------------------------PLAYER X AXIS MOVEMENT-----------------------------------

  if (keys.ArrowLeft.pressed && player.lastKey === "ArrowLeft") {
    player.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && player.lastKey === "ArrowRight") {
    player.velocity.x = 5;
  }

  //-------------------------------------ENEMY X AXIS MOVEMENT-------------------------------------

  if (keys.a.pressed && enemy.lastKey === "a") {
    enemy.velocity.x = -5;
  } else if (keys.d.pressed && enemy.lastKey === "d") {
    enemy.velocity.x = 5;
  }

  //------------------------------------- Detect PLAYER COLLISION ----------------------------------------

  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking
    ) {
    player.isAttacking = false
    enemy.health -= 20;
    document.querySelector('#enemy-health').style.width = enemy.health + "%"
  }

 //------------------------------------- Detect ENEMY COLLISION ----------------------------------------

 if (
  rectangularCollision({
    rectangle1: enemy,
    rectangle2: player
  }) &&
  enemy.isAttacking
  ) {
  enemy.isAttacking = false
  player.health -= 20;
  document.querySelector('#player-health').style.width = player.health + "%"
}




}

animate();

// ------- KEY DOWN properties Player -------------------------------------------------------------

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      player.lastKey = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;      
      player.lastKey = "ArrowRight";       
      break;                               
    case "ArrowUp":              
      player.velocity.y = -20;
      break;
    case ' ': 
      player.attack();
      break; 
    
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
      enemy.velocity.y = -20;
      break;
      case 'f':
      enemy.attack()
      break;

  }  
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
});
