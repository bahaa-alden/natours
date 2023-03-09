/* eslint-disable */
import '@babel/polyfill';
import { login, logout, signup } from './login';
import { displayMap } from './mapbox';
import { addReview, deleteReview, updateReview, colorStars } from './review.js';
import { updateUserData, updateUserPassword } from './updateUser';

//DOM Elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form-login');
const signupForm = document.querySelector('.form-signup');
const logoutBtn = document.querySelector('.nav__el--logout');
const updateUserDataFrom = document.querySelector('.form-user-data');
const updateUserPasswordForm = document.querySelector('.form-user-settings');
const reviewForm = document.querySelector('.review-form');
const reviewsOption = document.querySelector('.reviews__options');
const reviewMore = document.querySelector('.reviews__more');
const reviewEdit = document.querySelector('.reviews__edit');
const reviewEditForm = document.querySelector('.reviews__edit__form');
let reviewCard = '';
let reviewText = '';
let reviewStars = '';
let reviewId = '';

//Delegation
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    login({ email, password });
  });
}
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password');
    const passwordConfirm = data.get('passwordConfirm');
    signup({ name, email, password, passwordConfirm });
  });
}

if (updateUserDataFrom) {
  updateUserDataFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    updateUserData({ name, email });
  });
}

if (updateUserPasswordForm) {
  updateUserPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = data.get('password');
    const passwordConfirm = data.get('passwordConfirm');
    const passwordCurrent = data.get('passwordCurrent');
    updateUserPassword({ password, passwordConfirm, passwordCurrent });
  });
}

if (reviewForm) {
  const star = reviewForm.querySelectorAll('.star');
  colorStars(star);
  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const save = reviewForm.querySelector('.save');
    const review = reviewForm.querySelector('#review-input').value;
    const tour = document.querySelector('.tour-id').getAttribute('data-id');
    let rating = 0;
    star.forEach((e) => {
      if (e.classList.contains('star--active')) rating++;
    });
    save.textContent = 'Posting...';
    await addReview({ review, rating, tour });
    save.textContent = 'Add';
  });
}

if (reviewMore) {
  reviewMore.addEventListener('click', () => {
    reviewsOption.classList.add('active');
  });
}
if (reviewsOption) {
  reviewCard = reviewsOption.parentElement;
  reviewText = reviewCard.querySelector('.reviews__text');
  reviewStars = reviewCard.querySelectorAll('.reviews_stars .reviews__star');
  document.addEventListener('click', (e) => {
    if (
      !e.target.classList.contains('reviews__options') &&
      !e.target.classList.contains('reviews__more') &&
      !e.target.classList.contains('reviews__edit--btn') &&
      !e.target.classList.contains('reviews__delete--btn')
    ) {
      reviewsOption.classList.remove('active');
    }
  });
  const deleteBtn = reviewsOption.querySelector('.reviews__delete--btn');
  const editBtn = reviewsOption.querySelector('.reviews__edit--btn');
  reviewId = reviewsOption.parentElement.getAttribute('data-id');
  deleteBtn.addEventListener('click', () => {
    deleteReview(reviewId);
    reviewsOption.classList.remove('active');
    reviewCard.remove();
  });
  editBtn.addEventListener('click', () => {
    reviewEdit.classList.add('active');
    reviewsOption.classList.remove('active');
  });
}
if (reviewEditForm) {
  const cancel = reviewEditForm.querySelector('.cancel');
  const update = reviewEditForm.querySelector('.update');
  const star = reviewEditForm.querySelectorAll('.star');
  colorStars(star);
  reviewEditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const review = reviewEditForm.querySelector('#review-input').value;
    let rating = 0;
    star.forEach((e) => {
      if (e.classList.contains('star--active')) rating++;
    });
    update.textContent = 'Updating...';
    await updateReview(review, rating, reviewId);
    reviewText.textContent = review;

    //color stars after update
    for (let index = 0; index < rating; index++) {
      reviewStars[index].classList.remove('reviews__star--inactive');
      reviewStars[index].classList.add('reviews__star--active');
      console.log('ss');
    }
    for (let index = rating; index < 5; index++) {
      reviewStars[index].classList.remove('reviews__star--active');
      reviewStars[index].classList.add('reviews__star--inactive');
    }
    //enable cancel button
    cancel.addEventListener('click', () =>
      reviewEdit.classList.remove('active')
    );
    reviewEdit.classList.remove('active');
    update.textContent = 'Update';
  });
}
