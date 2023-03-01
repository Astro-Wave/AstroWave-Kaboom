kaboom();

loadSprite("birdy", "image/astronaut.png");
loadSprite("bg", "image/Astro-Background.png");
loadSprite("pipe", "image/newPipe.png");
loadSprite("endGame", "image/game_end_page(2).jpeg");
loadSound("wooosh", "sound/wooosh.mp3");
loadSound("bgm", "sound/background-music.mp3");
loadSound("cry", "sound/cry.mp3");

const music = play("bgm", { loop: true, volume: 0.5 });

let highScore = 0;
let jump = 400;
let pipeGap = 200;

scene("easy", () => {
  jump = 400;
  pipeGap = 200;
  go("game");
});

scene("medium", () => {
  jump = 350;
  pipeGap = 150;
  go("game");
});

scene("hard", () => {
  jump = 250;
  pipeGap = 120;
  go("game");
});

scene("start", () => {
  add([
    sprite("bg"),
    { width: width(), height: height() },
    pos(width() / 2, height() / 2),
    origin("center"),
    scale(1),
    fixed(),
  ]);

  add([
    text("[AstroWave].pink.wavy", {
      width: width(),
      styles: {
        pink: {
          color: rgb(199, 206, 230),
        },
        wavy: (idx, ch) => ({
          color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
          pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
        }),
      },
    }),
    pos(width() / 2, height() / 6),
    origin("center"),
  ]);

  add([
    text("Press E for Easy\n" + "Press M for Medium\n" + "Press H for Hard\n", { size: 50 }),
    pos(width() / 2, height() / 1.9),
    origin("center"),
    area(),
  ]);

  add([
    text("Press Space to Jump", 
	{size: 50}),
	color(59,153,229),
    pos(width() / 2, height() / 1.4),
    origin("center"),
  ]);

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
  const scoreText = add([text(`Score: ${score}`, { size: 50 })]);

  const player = add([
    sprite("birdy"),
    scale(2),
    pos(width() / 4, height() / 2),
    area(),
    body(),
  ]);

  function producePipes() {
    const offset = rand(-100, 100);

    add([
      sprite("pipe"),
      pos(width(), height() / 2 + offset + pipeGap / 2),
      "pipe",
      area(),
      { passed: false },
      scale(0.3, 0.5),
    ]);

    add([
      sprite("pipe", { flipY: true }),
      pos(width(), height() / 2 + offset - pipeGap / 2),
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
    play("cry", { volume: 0.4 });
    go("gameover", score);
  });

  player.action(() => {
    if (player.pos.y > height() + 30 || player.pos.y < -30) {
      play("cry", { volume: 0.4 });
      go("gameover", score);
    }
  });

  keyPress("space", () => {
    play("wooosh", { volume: 0.4 });
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

  add([
    text("E: Easy\n" + "M: Medium\n" + "H: Hard\n", {size: 60}),
    pos(width() - width() + width()/8, height() / 2),
    origin("left"),
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

  	add([
		text("Game Over", { size: 80 }),
		pos(width() / 2, height() / 6),
		color(255, 0, 0),
		origin("center"),
	])
   add([
    text("Score: " + score + "\nHigh Score: " + highScore, { size: 60 }),
    pos(width() - width()/8, height() / 2),
    origin("right"),
    area(),
  ]);
});

go("start");
