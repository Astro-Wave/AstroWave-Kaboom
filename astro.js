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

const music = play("bgm", { loop: true, volume: 0.5 });
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

  onUpdate("pipe", (pipe) => {
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
      play("ohno");
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

  keyPress("h", () => {
    go("hard");
  });
});

go("start");
