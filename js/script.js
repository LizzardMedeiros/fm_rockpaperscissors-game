const icons = {
  spock: {
    icon: 'icon-spock.svg',
    color: 'hsl(39, 89%, 49%)'
  },
  scissors: {
    icon: 'icon-scissors.svg',
    color: 'hsl(189, 59%, 53%)'
  },
  paper: {
    icon: 'icon-paper.svg',
    color: 'hsl(230, 89%, 62%)'
  },
  lizard: {
    icon: 'icon-lizard.svg',
    color: 'hsl(261, 73%, 60%)'
  },
  rock: {
    icon: 'icon-rock.svg',
    color: 'hsl(349, 71%, 52%)'
  }
};

window.onload = function() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(icon => {
    const {icon: img, color} = icons[icon.id];
    icon.style.borderColor = color;
    icon.style.backgroundImage = `url(images/${img})`;
    icon.addEventListener('click', selectIcon);
  }); 
}

function selectIcon(ev) {
  const step = document.querySelector('.step-1');
  const nextStep = document.querySelector('.step-2');
  const selectedIcon = nextStep.children[0].lastElementChild;

  const {icon, color} = icons[ev.target.id];
  
  selectedIcon.style.borderColor = color;
  selectedIcon.lastElementChild.src = `images/${icon}`;

  step.classList.add('hidden');
  nextStep.classList.remove('hidden');

}
