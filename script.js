'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const navLinks = document.querySelectorAll('.nav__link');
const navLogo = document.querySelector('.nav__logo');

const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// NAVIGATION HOVER EFFECT

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// BTN Scrooll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Operations Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active'),
  );

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = entries => {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const observer = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  observer.observe(section);
  section.classList.add('section--hidden');
});

// lazy loading images
const lazyImages = document.querySelectorAll('img[data-src]');

const revealImg = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.classList.remove('lazy-img');
    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(revealImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

lazyImages.forEach(img => {
  imgObserver.observe(img);
  img.classList.add('lazy-img');
});

// Slider component
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let currentSlide = 0;
const maxSlideLength = slides.length;

for (let i = 0; i < maxSlideLength; i++) {
  const dotChild = document.createElement('div');
  dotChild.classList.add('dots__dot');
  dotChild.dataset.slide = i;
  dotContainer.appendChild(dotChild);
  console.log('Ubacen ' + i + '. element');
}
const dots = document.querySelectorAll('.dots__dot');

const goToSlide = function (slideIndex) {
  if (slideIndex < 0 || slideIndex >= maxSlideLength) return;
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - slideIndex)}%)`;
    currentSlide = slideIndex;
  });

  dots.forEach(dot => dot.classList.remove('dots__dot--active'));
  dots[slideIndex].classList.add('dots__dot--active');
};

btnLeft.addEventListener('click', () => goToSlide(currentSlide - 1));
btnRight.addEventListener('click', () => goToSlide(currentSlide + 1));
dots.forEach(dot =>
  dot.addEventListener('click', () => goToSlide(dot.dataset.slide)),
);

goToSlide(currentSlide);
