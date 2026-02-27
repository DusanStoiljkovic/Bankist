'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const navLinks = document.querySelectorAll('.nav__link');
const navLogo = document.querySelector('.nav__logo');

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

// NAVIGATION
navLinks.forEach(link =>
  link.addEventListener('mouseenter', e => {
    e.preventDefault();

    navLinks.forEach(link => {
      if (link !== e.target) {
        link.style.opacity = '0.5';
      }
      navLogo.style.opacity = '0.5';
    });
  }),
);

navLinks.forEach(link =>
  link.addEventListener('mouseleave', e => {
    e.preventDefault();

    navLinks.forEach(link => {
      if (link !== e.target) {
        link.style.opacity = '1';
      }
      navLogo.style.opacity = '1';
    });
  }),
);
