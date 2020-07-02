let score = 0;
let playerChoice = null;
let houseChoice = null;

const icons = {
  spock: {
    icon: 'icon-spock.svg',
    color: 'hsl(39, 89%, 49%)',
    wins: 'scissors',
    loses: 'paper'
  },
  scissors: {
    icon: 'icon-scissors.svg',
    color: 'hsl(189, 59%, 53%)',
    wins: 'paper',
    loses: 'rock'
  },
  paper: {
    icon: 'icon-paper.svg',
    color: 'hsl(230, 89%, 62%)',
    wins: 'rock',
    loses: 'lizard'
  },
  rock: {
    icon: 'icon-rock.svg',
    color: 'hsl(349, 71%, 52%)',
    wins: 'lizard',
    loses: 'spock'
  },
  lizard: {
    icon: 'icon-lizard.svg',
    color: 'hsl(261, 73%, 60%)',
    wins: 'spock',
    loses: 'scissors'
  }
};

const messages = {
  win: 'You Win',
  lose: 'You lose',
  tie: 'Tie!'
}

window.onload = function() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(icon => {
    const {icon: img, color} = icons[icon.id];
    icon.style.borderColor = color;
    icon.style.backgroundImage = `url(images/${img})`;
    icon.addEventListener('click', selectIcon);
  });
}

function loadAll() {
  playerChoice = null;
  houseChoice = null;
  //reset all;
  document.querySelector('.step-1').classList.remove('hidden');
  document.querySelector('.step-2').classList.add('hidden');
  document.querySelector('.controls').classList.add('hidden');
  document.querySelector('#house-selected').classList.add('turned');
  document.querySelector('#house-selected').innerText = '';
  document.querySelector('#score').innerText = score;
}

function selectIcon(ev) {
  const step = document.querySelector('.step-1');
  const nextStep = document.querySelector('.step-2');
  const selectedIcon = document.querySelector('#player-selected');

  const {icon, color} = icons[ev.target.id];
  
  selectedIcon.style.borderColor = color;
  selectedIcon.lastElementChild.src = `images/${icon}`;

  step.classList.add('hidden');
  nextStep.classList.remove('hidden');

  playerChoice = ev.target.id;
  play();
}

function play() {
  const houseSelectedIcon = document.querySelector('#house-selected');
  const keys = Object.keys(icons);
  houseChoice = keys[Math.floor(Math.random() * keys.length)];

  const houseSelect = icons[houseChoice];
  const img = document.createElement('img');
  img.src = `images/${houseSelect.icon}`;
  img.setAttribute('width', '100px');

  setTimeout(() => {
    houseSelectedIcon.classList.remove('turned');
    houseSelectedIcon.appendChild(img);
    houseSelectedIcon.style.borderColor = houseSelect.color;
    checkWin();
  }, 1000);
}

function checkWin() {
  const controls = document.querySelector('.controls');
  const message = document.querySelector('#message');

  const isWon = icons[playerChoice].wins === houseChoice ? 1 :
    icons[houseChoice].loses === playerChoice ? 1 :
    playerChoice === houseChoice ? -1 : 0;
  
  setTimeout(() => {
    switch(isWon) {
      case 0:
        message.innerText = messages['lose'];
        if(score > 0) score--;
        break;
      case 1:
        message.innerText = messages['win'];
        score++;
        break;
      default:
        message.innerText = messages['tie'];
        break;
    }
    controls.classList.remove('hidden');
    document.querySelector('#restart').addEventListener('click', loadAll);
  }, 1000);
}