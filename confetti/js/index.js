
function fire(confettiOption) {
  confetti(confettiOption);
}

function onBase() {
  fire({});
}

function onCracker() {
  let confettiOption = {
    particleCount: 200,
    spread: 30,
    startVelocity: 70,
    colors: ['#bb0000', '#ffffff'],
    origin: {
      x: 0,
      y: 0.9
    },
    angle: 45
  }
  fire(confettiOption);

  confettiOption.origin.x = 1;
  confettiOption.angle = 135;
  fire(confettiOption);
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

let isfalling = false
function onFall() {
  if (isfalling) {
    return;
  }
  isfalling = true;

  let confettiOption = {
    ticks: 800,
    angle: 90,
    spread: 90,
    origin: {
      y: 0
    }
  }
  const intervalId = setInterval(() => {
    confettiOption.origin.x = Math.random();
    fire(confettiOption);
  }, 100);

  setTimeout(() => {
    isfalling = false;
    clearInterval(intervalId)
  }, 5000);
}

function onFirework() {
  let confettiOption = {
    particleCount: 100,
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    shapes: ['circle'],
    origin: {
      x: randomInRange(0.2, 0.8),
      y: randomInRange(0.2, 0.5)
    }
  }
  fire(confettiOption);
}

function onCustom() {
  const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10z' });
  const pineapple = confetti.shapeFromText({ text: '🍍' });
  let confettiOption = ({
    shapes: [triangle, pineapple],
    scalar: 2,
  });
  fire(confettiOption);
}

