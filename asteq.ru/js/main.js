var rellax = new Rellax('.works__list-img-1');
var rellax = new Rellax('.works__list-img-2');
var rellax = new Rellax('.works__list-img-3');
var rellax = new Rellax('.hero-description');
var rellax = new Rellax('.hero-title');


const sideMenu = () => {
  const sections = document.querySelectorAll('section');
  const sectionsList = [...sections];

  const getActiveSection = function (target) {
    const targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
      },
      windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };

    if (targetPosition.bottom > windowPosition.top &&
      targetPosition.top < windowPosition.bottom &&
      targetPosition.right > windowPosition.left &&
      targetPosition.left < windowPosition.right) {
      return target;
    }
  };

  const renderSideMenu = (prev, active, next) => {
    const relevantElems = [prev, active, next];

    const getSideMenuElems = () => {
      return [
        document.querySelector('.nav__menu-link-prev'),
        document.querySelector('.nav__menu-link-active'),
        document.querySelector('.nav__menu-link-next')
      ];
    };

    getSideMenuElems().forEach((el, i) => {
      if (relevantElems[i] === '' && i === 0) {
        el.textContent = '';
        el.classList.add('nav__menu-link-no-prev');
      } else if (relevantElems[i] === '' && i === 2) {
        el.textContent = '';
        el.classList.remove('nav__menu-link-no-prev');
        el.classList.add('nav__menu-link-no-next');
      } else if (el !== relevantElems[i].classList.value) {
        el.classList.remove('nav__menu-link-no-next');
        el.classList.remove('nav__menu-link-no-prev');
        el.textContent = relevantElems[i].getAttribute('data-section-rus');
      }
    });
  };

  window.addEventListener('scroll', () => {
    sections.forEach(el => {
      if (getActiveSection(el)) {
        let activeSection = getActiveSection(el),
          activeSectionIndex = sectionsList.indexOf(activeSection),
          prevSection = sectionsList[activeSectionIndex - 1],
          nextSection = sectionsList[activeSectionIndex + 1];

        prevSection === undefined ? renderSideMenu('', activeSection, nextSection) :
          nextSection === undefined ? renderSideMenu(prevSection, activeSection, '') :
          renderSideMenu(prevSection, activeSection, nextSection);
      }
    });
  });
};
sideMenu();

const heroColors = () => {
  const heroTitle = document.querySelector('.hero-title');

  const randomColor = () => {
    let colors = [
      'rgb(92,87,117)', // #5C5775 
      'rgb(120,208,211)', // #78D0D3 
      'rgb(242,201,76)', // #F2C94C 
      'rgb(118,228,182)', // #76E4B6 
      'rgb(250,178,138)', // #FAB28A 
      'rgb(255,122,130)', // #FF7A82 
      'rgb(137,205,255)' // #89CDFF 
    ];

    return colors[Math.floor(Math.random() * colors.length - 1)];
  };

  const setColor = (defaultColor = false) => defaultColor === 'base' ? heroTitle.style.color = '#333333' : heroTitle.style.color = randomColor();

  heroTitle.addEventListener('mouseover', setColor);
  heroTitle.addEventListener('mouseout', () => {
    setColor('base');
  });
};
heroColors();

AOS.init();