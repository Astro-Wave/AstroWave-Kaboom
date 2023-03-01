// kaboom()

// loadSprite("astronut", "image/astronaut.png")
// loadSprite("background", "image/Astro-Background.png")
// loadSprite("pipe", "image/Astro-Pipe.png")
// // loadSound("score", "/sounds/score.mp3")
// // loadSound("wooosh", "/sounds/wooosh.mp3")
// // loadSound("hit", "/sounds/hit.mp3")

// scene("game", () => {

//     let highScore = 0;
// 	const PIPE_OPEN = 240
// 	const PIPE_MIN = 60
// 	const JUMP_FORCE = 600
// 	const SPEED = 320
// 	const CEILING = -60

// 	// define gravity
// 	gravity(2500)

//     //background
//     add([
//         sprite("background", {width: width(), height: height()})
//       ]);

// 	// a game object consists of a list of components and tags
// 	const astronut = add([
// 		// sprite() means it's drawn with a sprite of name "bean" (defined above in 'loadSprite')
// 		sprite("astronut"),
// 		// give it a position
// 		pos(width() / 4, 0),
// 		// give it a collider
// 		area(),
// 		// body component enables it to fall and jump in a gravity world
// 		body(),
// 		scale(5)
// 	])

// 	// check for fall death
// 	astronut.onUpdate(() => {
// 		if (astronut.pos.y >= height() || astronut.pos.y <= CEILING) {
// 			// switch to "lose" scene
// 			go("lose", score)
// 		}
// 	})

// 	// jump
// 	onKeyPress("space", () => {
// 		astronut.jump(JUMP_FORCE)
// 		// play("wooosh")
// 	})

// 	// mobile
// 	onClick(() => {
// 		astronut.jump(JUMP_FORCE)
// 		// play("wooosh")
// 	})

// 	function spawnPipe() {

// 		// calculate pipe positions
// 		const h1 = rand(PIPE_MIN, height() - PIPE_MIN - PIPE_OPEN)
// 		const h2 = height() - h1 - PIPE_OPEN

// 		add([
// 			pos(width(), 0),
// 			rect(64, h1),
// 			color(0, 127, 255),
// 			outline(4),
// 			area(),
// 			move(LEFT, SPEED),
// 			cleanup(),
// 			// give it tags to easier define behaviors see below
// 			"pipe",
// 		])

// 		add([
// 			pos(width(), h1 + PIPE_OPEN),
// 			rect(64, h2),
// 			color(0, 127, 255),
// 			outline(4),
// 			area(),
// 			move(LEFT, SPEED),
// 			cleanup(),
// 			// give it tags to easier define behaviors see below
// 			"pipe",
// 			// raw obj just assigns every field to the game obj
// 			{ passed: false, },
// 		])

// 	}

// 	// callback when bean onCollide with objects with tag "pipe"
// 	astronut.onCollide("pipe", () => {
// 		go("lose", score)
// 		// play("hit")
// 		// addKaboom(astronut.pos)
// 	})

// 	// per frame event for all objects with tag 'pipe'
// 	onUpdate("pipe", (p) => {
// 		// check if bean passed the pipe
// 		if (p.pos.x + p.width <= astronut.pos.x && p.passed === false) {
// 			addScore()
// 			p.passed = true
// 		}
// 	})

// 	// spawn a pipe every 1 sec
// 	loop(1, () => {
// 		spawnPipe()
// 	})

// 	let score = 0

// 	// display score
// 	const scoreLabel = add([
// 		text(score),
// 		origin("center"),
// 		pos(width() / 2, 80),
// 		fixed(),
// 	])

// 	function addScore() {
// 		score++
// 		scoreLabel.text = score
// 		// play("score")
// 	}

// })

// scene("lose", (score) => {

// 	add([
// 		sprite("astronut"),
// 		pos(width() / 2, height() / 2 - 108),
// 		scale(3),
// 		origin("center"),
// 	])

// 	// display score
// 	add([

// 		text(score),
// 		pos(width() / 2, height() / 2 + 108),
// 		scale(3),
// 		origin("center"),
// 	])

// 	// go back to game with space is pressed
// 	onKeyPress("space", () => go("game"))
// 	onClick(() => go("game"))

// })

// go("game")

kaboom();

// load assets
loadSprite("birdy", "image/astronaut.png");
loadSprite("bg", "image/Astro-Background.png");
loadSprite("pipe", "image/newPipe.png");
loadSprite("endGame", "image/game_end_page(2).jpeg");
// loadSound("wooosh", "sound/wooosh.mp3");
// loadSound("bgm", "sound/background-music.mp3")
// loadSound("cry", "sound/cry.mp3")

// const music = play("bgm", { loop: true, volume: 0.5})

let highScore = 0;
let jump = 400;
let PIPE_GAP = 200;

scene("easy", () => {
  jump = 400;
  PIPE_GAP = 200
  go("game");
});

scene("medium", () => {
  jump = 350;
  PIPE_GAP = 150
  go("game");
});

scene("hard", () => {
  jump = 250;
  PIPE_GAP = 100
  go("game");
});

scene("start", () => {
  const bg = add([
    sprite("bg"),
    { width: width(), height: height() },
    pos(width() / 2, height() / 2),
    origin("center"),
    scale(1),
    fixed(),
  ]);
  // const title =add([text("AstroWave")],pos(center()), scale(0.75, 0.75), origin("center"), area()]);
  //       // width: width(),
  //       // styles: {
  //       //   // "purple":{
  //       //   // strokeColor: rgb(125,128,167),
  //       //   // },
  //       //   pink: {
  //       //     color: rgb(197, 119, 148),
  //       //   },
  //       //   wavy: (idx, ch) => ({
  //       //     // color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
  //       //     pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
  //       //   }),
  //       // },
  //     });

  const title = add([
    text(
      "AstroWave"
    ),
    pos(width()/2, height()/6),
    origin("center")
  ])
  const startText = add([
    text(
      "Press E for Easy\n" +
        "Press M for Medium\n" +
        "Press H for Hard\n"
    ),
    pos(width()/2, height()/1.9),
    origin("center"),
    area(),
  ]);

  const spaceJump = add([
    text(
      "Press Space to Jump",
    ),
    pos(width()/2, height()/1.4),
    origin("center"),
  ])
  // onKeyPress("space", () => go("game"))
  keyPress("e", () => {
    go("easy");
  });

  keyPress("m", () => {
    go("medium");
  });

  keyPress("h", () => {
    go("hard");
  });
});

scene("game", () => {
  let score = 0;

  add([sprite("endGame", { width: width(), height: height() })]);
  const scoreText = add([
    text(`Score: ${score}`, 
    { size: 50 })
  ]);

  // add a game object to screen
  const player = add([
    // list of components
    sprite("birdy"),
    scale(2),
    pos(200, 200),
    area(),
    body(),
  ]);

  function producePipes() {
    const offset = rand(-100, 100);

    add([
      sprite("pipe"),
      pos(width(), height() / 2 + offset + PIPE_GAP / 2),
      "pipe",
      area(),
      { passed: false },
      scale(0.3, 0.5),
    ]);

    add([
      sprite("pipe", { flipY: true }),
      pos(width(), height() / 2 + offset - PIPE_GAP / 2),
      origin("botleft"),
      "pipe",
      area(),
      scale(0.3, 0.5),
    ]);
  }

  loop(1.5, () => {
    producePipes();
  });

  action("pipe", (pipe) => {
    pipe.move(-160, 0);

    if (pipe.passed === false && pipe.pos.x < player.pos.x) {
      pipe.passed = true;
      score += 1;
      scoreText.text = `Score: ${score}`;
    }
  });

  player.collides("pipe", () => {
    // play("cry")
    go("gameover", score);
  });

  player.action(() => {
    if (player.pos.y > height() + 30 || player.pos.y < -30) {
      go("gameover", score);
    }
  });

  keyPress("space", () => {
    // play("wooosh");
    player.jump(jump);
  });
});

scene("gameover", (score) => {
  const bg = add([
    sprite("bg"),
    { width: width(), height: height() },
    pos(width() / 2, height() / 2),
    origin("center"),
    scale(1),
    fixed(),
  ]);
 
  const  modeText = add([
    text("E: Easy\n" +
    "M: Medium\n" +
    "H: Hard\n"),
    pos(width() - width() + 20, height() /2),
    origin("left"),
    area(),
  ]);
  
  const endText = add([
    text("Game Over\n" + 
    "Score: " + score + 
    "\nHigh Score: " + highScore),
    pos(width()-20, height()/2),
    origin("right"),
    area(),
  ]);

  onKeyPress("space", () => go("game"));

  if (score > highScore) {
    highScore = score;
  }

  keyPress("e", () => {
    go("easy");
  });

  keyPress("m", () => {
    go("medium");
  });

  keyPress("h", () => {
    go("hard");
  });
});

go("start");
