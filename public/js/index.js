/* eslint-disable */
import '@babel/polyfill';
import { forgotPassword, login, logout, resetPassword, signup } from './login';
import { displayMap } from './mapbox';
import { addReview, deleteReview, updateReview, colorStars } from './review.js';
import { bookTour } from './stripe';
import { updateSettings } from './updateUser';

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
const forgotPasswordForm = document.querySelector('.form-forget');
const resetPasswordForm = document.querySelector('.form-reset');
const bookBtn = document.getElementById('book-tour');
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
    const photo = new FormData();
    signup({ name, email, password, passwordConfirm });
  });
}

if (updateUserDataFrom) {
  updateUserDataFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateSettings(formData, 'data');
  });
}

if (updateUserPasswordForm) {
  updateUserPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = data.get('password');
    const passwordConfirm = data.get('passwordConfirm');
    const passwordCurrent = data.get('passwordCurrent');
    await updateSettings(
      { password, passwordConfirm, passwordCurrent },
      'password'
    );
  });
}

if (reviewForm) {
  const stars = reviewForm.querySelectorAll('.star');
  colorStars(stars);
  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const save = reviewForm.querySelector('.save');
    const review = reviewForm.querySelector('#review-input').value;
    const tour = document.querySelector('.tour-id').getAttribute('data-id');
    let rating = 0;
    stars.forEach((e) => {
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
  const stars = reviewEditForm.querySelectorAll('.star');

  cancel.addEventListener('click', () => reviewEdit.classList.remove('active'));

  //make the form's stars enable
  colorStars(stars);
  reviewEditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const review = reviewEditForm.querySelector('#review-input').value;
    let rating = 0;
    stars.forEach((e) => {
      if (e.classList.contains('star--active')) rating++;
    });
    update.textContent = 'Updating...';
    await updateReview(review, rating, reviewId);
    reviewText.textContent = review;

    //color stars after update
    for (let index = 0; index < rating; index++) {
      reviewStars[index].classList.remove('reviews__star--inactive');
      reviewStars[index].classList.add('reviews__star--active');
    }
    for (let index = rating; index < 5; index++) {
      reviewStars[index].classList.remove('reviews__star--active');
      reviewStars[index].classList.add('reviews__star--inactive');
    }
    //hide update form
    reviewEdit.classList.remove('active');
    update.textContent = 'Update';
  });
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email');

    await forgotPassword({ email });
  });
}

if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const resetToken = data.get('resetToken');
    const password = data.get('password');
    const passwordConfirm = data.get('passwordConfirm');
    resetPassword(password, passwordConfirm, resetToken);
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', async (e) => {
    const { tourId } = e.target.dataset;
    e.target.textContent = 'Processing...';
    await bookTour(tourId);
    e.target.textContent = 'Book tour now!';
  });
}
