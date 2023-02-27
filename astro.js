kaboom()

loadSprite("astronut", "image2/pixilart-drawing (1).png")
loadSprite("background", "image2/Astro-Background.png")
// loadSound("score", "/sounds/score.mp3")
// loadSound("wooosh", "/sounds/wooosh.mp3")
// loadSound("hit", "/sounds/hit.mp3")

scene("game", () => {

    let highScore = 0;
	const PIPE_OPEN = 240
	const PIPE_MIN = 60
	const JUMP_FORCE = 600
	const SPEED = 320
	const CEILING = -60

	// define gravity
	gravity(2500)

    //background
    add([
        sprite("background", {width: width(), height: height()})
      ]);

	// a game object consists of a list of components and tags
	const astronut = add([
		// sprite() means it's drawn with a sprite of name "bean" (defined above in 'loadSprite')
		sprite("astronut"),
		// give it a position
		pos(width() / 4, 0),
		// give it a collider
		area(),
		// body component enables it to fall and jump in a gravity world
		body(),
	])

	// check for fall death
	astronut.onUpdate(() => {
		if (astronut.pos.y >= height() || astronut.pos.y <= CEILING) {
			// switch to "lose" scene
			go("lose", score)
		}
	})

	// jump
	onKeyPress("space", () => {
		astronut.jump(JUMP_FORCE)
		// play("wooosh")
	})

	// mobile
	onClick(() => {
		astronut.jump(JUMP_FORCE)
		// play("wooosh")
	})

	function spawnPipe() {

		// calculate pipe positions
		const h1 = rand(PIPE_MIN, height() - PIPE_MIN - PIPE_OPEN)
		const h2 = height() - h1 - PIPE_OPEN

		add([
			pos(width(), 0),
			rect(64, h1),
			color(0, 127, 255),
			outline(4),
			area(),
			move(LEFT, SPEED),
			cleanup(),
			// give it tags to easier define behaviors see below
			"pipe",
		])

		add([
			pos(width(), h1 + PIPE_OPEN),
			rect(64, h2),
			color(0, 127, 255),
			outline(4),
			area(),
			move(LEFT, SPEED),
			cleanup(),
			// give it tags to easier define behaviors see below
			"pipe",
			// raw obj just assigns every field to the game obj
			{ passed: false, },
		])

	}

	// callback when bean onCollide with objects with tag "pipe"
	astronut.onCollide("pipe", () => {
		go("lose", score)
		// play("hit")
		// addKaboom(astronut.pos)
	})

	// per frame event for all objects with tag 'pipe'
	onUpdate("pipe", (p) => {
		// check if bean passed the pipe
		if (p.pos.x + p.width <= astronut.pos.x && p.passed === false) {
			addScore()
			p.passed = true
		}
	})

	// spawn a pipe every 1 sec
	loop(1, () => {
		spawnPipe()
	})

	let score = 0

	// display score
	const scoreLabel = add([
		text(score),
		origin("center"),
		pos(width() / 2, 80),
		fixed(),
	])

	function addScore() {
		score++
		scoreLabel.text = score
		// play("score")
	}

})

scene("lose", (score) => {

	add([
		sprite("astronut"),
		pos(width() / 2, height() / 2 - 108),
		scale(3),
		origin("center"),
	])

  add([
    sprite("background", {width: width(), height: height()})
  ]);

	// display score
	add([
        
		text(score),
		pos(width() / 2, height() / 2 + 108),
		scale(3),
		origin("center"),
	])

	// go back to game with space is pressed
	onKeyPress("space", () => go("game"))
	onClick(() => go("game"))

})

go("game")
