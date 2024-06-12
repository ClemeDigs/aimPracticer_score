const modale = document.querySelector('.modal--restart');
const span = document.querySelector('.message');
const startBtn = document.querySelector('.start-button');
const scoreHtml = document.querySelector('.score');

class Game {
  constructor(board) {
    this.board = board;
    this.totalTarget = 0;
    this.score = 0;
    this.speed = 1500;
    this.spawnInterval = null;
  }

  start() {
    this.totalTarget = 0;
    this.score = 0;
    this.speed = 2000;
    modale.classList.add('hidden');
    this.clearBoard();
    this.updateSpawnInterval();
  }

  lost() {
    this.score = 0;
    clearInterval(this.spawnInterval);
    modale.classList.remove('hidden');
    span.textContent = 'You lost...';
  }

  clearBoard() {
    let targets = document.querySelectorAll('.target');
    targets.forEach(target => target.remove());
    this.totalTarget = 0;
  }

  getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  getRandomColor() {
    const colors = ['#C947F5', '#00CCFF', '#FF01BA', '#31F4A3', '#F95D5D', '#E4F53B'];
    return colors[this.getRandomNumber(colors.length)];
  }

  getRandomPosition() {
    return Math.round(Math.random() * 10000) / 100;
  }

  getRandomSize() {
    return Math.floor(Math.random() * 40.99) + 20;
  }

  addTarget() {
    const target = new Target(
      this.getRandomPosition(),
      this.getRandomPosition(),
      this.getRandomSize(),
      this.getRandomColor()
    ).toHtml();

    target.addEventListener('click', () => {
      target.remove();
      scoreHtml.textContent = ++this.score;
      this.totalTarget--;
      this.speed -= 50;
      if (this.speed < 300) {
        this.speed = 300;
      }
      this.updateSpawnInterval();
    });

    this.board.appendChild(target);
    this.totalTarget++;
  }

  updateSpawnInterval() {
    clearInterval(this.spawnInterval); 
    this.spawnInterval = setInterval(() => {
      if (this.totalTarget >= 10) {
        this.lost();
      } else {
        this.addTarget();
      }
    }, this.speed);
  }
}

class Target {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  toHtml() {
    const div = document.createElement('div');
    div.className = 'target';
    div.style.top = `max(0px, calc(${this.y}% - ${this.size}px))`;
    div.style.left = `max(0px, calc(${this.x}% - ${this.size}px))`;
    div.style.height = this.size + 'px';
    div.style.width = this.size + 'px';
    div.style.backgroundColor = this.color;

    return div;
  }
}

if (startBtn) {
  startBtn.addEventListener('click', () => {
    game.start();
  });
}

const game = new Game(document.querySelector('.game'));

game.start();
