// ------- canvas properties ------------------------------------------------------------- A
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background =new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './FG-Assets/background.png'
})

const shop =new Sprite({
  position: {
    x: 600,
    y: 192
  },
  imageSrc: './FG-Assets/shop.png',
  scale: 2.25,
  framesMax: 6
})


const player = new Fighter({
  position: {
    x: 50,
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
  },
  imageSrc: './FG-Assets/samuraiMack/idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 150
  },
  sprites: {
    idle: {
      imageSrc: './FG-Assets/samuraiMack/idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './FG-Assets/samuraiMack/run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './FG-Assets/samuraiMack/jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './FG-Assets/samuraiMack/fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './FG-Assets/samuraiMack/attack1.png',
      framesMax: 6
    }
  }
});

const enemy = new Fighter({
  position: {
    x: 900,
    y: 150,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './FG-Assets/kenji/idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 165
  },
  sprites: {
    idle: {
      imageSrc: './FG-Assets/kenji/idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './FG-Assets/kenji/run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './FG-Assets/kenji/jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './FG-Assets/kenji/fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './FG-Assets/kenji/attack1.png',
      framesMax: 4
    }
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

decreaseTimer()

//                                                     *******************Animate***************

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update() 
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x =0;

  //-------------------------------------PLAYER X AXIS MOVEMENT-----------------------------------
    
  if (keys.ArrowLeft.pressed && player.lastKey === "ArrowLeft") {
    player.velocity.x = -5;
    player.switchSprite('run')
  } else if (keys.ArrowRight.pressed && player.lastKey === "ArrowRight") {
    player.velocity.x = 5;
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  //-------------------------------------ENEMY X AXIS MOVEMENT-------------------------------------
   
  if (keys.a.pressed && enemy.lastKey === "a") {
    enemy.velocity.x = -5;
    enemy.switchSprite('run')
  } else if (keys.d.pressed && enemy.lastKey === "d") {
    enemy.velocity.x = 5;
    enemy.switchSprite('run')
  } else {
    enemy.switchSprite('idle') 
  }

//----------------------------------------- JUMP ANIMATION--------------------------------------------

  if (player.velocity.y < 0 ) {
    player.switchSprite('jump')    
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  if (enemy.velocity.y < 0 ) {
    enemy.switchSprite('jump')    
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
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

// ------------------------------------------- END GAME based on HEALTH ---------------------------------
if (enemy.health <= 0 || player.health <= 0) {
  determineWinner({player, enemy, timerId})
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
