/*=======================================================*/
/*                                                       */
/*  Olisa Nweze (2024)                                   */
/*  github.com/olisanweze                                */
/*                                                       */
/*=======================================================*/

'use strict';

import { select, selectAll, print, listen } from './utils.js';


/*=======================================================*/
/*  Global Variables                                     */
/*=======================================================*/

const modal = select('.modal-background');
const cookiesDialog = select('.cookies-dialog');
const settingsDialog = select('.settings-dialog');
const acceptButton = select('.accept-button');
const settingsButton = select('.settings-button');
const preferences = select('.preferences');
const inputs = selectAll('.toggle-switch');

/*=======================================================*/
/*  Functions                                            */
/*=======================================================*/

function displaySettingsDialog() {
  cookiesDialog.classList.add('none');
  settingsDialog.classList.add('block');
}

function displayModal() {
  setTimeout(() => {
    modal.classList.add('modal-bg-dark');
    cookiesDialog.classList.add('block');
  }, 1200);
} 

function getOperatingSystem(userAgent) {
  let operatingSystem = 
  userAgent.includes('Windows') ? 'Windows' :
  userAgent.includes('Macintosh') || userAgent.includes('Mac OS') ? 'Mac/iOS' :
  userAgent.includes('Android') ? 'Android' :
  userAgent.includes('Linux') ? 'Linux' :
  'Unknown';

  return operatingSystem;
}

function getBrowser(userAgent) {
  let browser =
  userAgent.includes('Firefox') ? 'Mozilla Firefox' :
  userAgent.includes('Opera') || userAgent.includes('OPR') ? 'Opera' :
  userAgent.includes('Edge') || userAgent.includes('Edg') ? 'Microsoft Edge' :
  userAgent.includes('Chrome') ? 'Google Chrome' :
  userAgent.includes('Safari') ? 'Apple Safari' :
  'Unknown';

  return browser;
}

function getWindowHeight() {
  return window.innerHeight;
}

function getWindowWidth() {
  return window.innerWidth;
}

function setAllCookies() {
  setCookie('Browser', getBrowser(navigator.userAgent), 15);
  setCookie('Operating system', getOperatingSystem(navigator.userAgent), 15);
  setCookie('Screen width', getWindowWidth(), 15);
  setCookie('Screen height', getWindowHeight(), 15);
  print('Cookies saved succesfully');
}

function printAllCookies() {
  print(`Browser: ${getCookie('Browser')}`);
  print(`Operating system: ${getCookie('Operating system')}`);
  print(`Screen width: ${getCookie('Screen width')}`);
  print(`Screen height: ${getCookie('Screen height')}`);
}

function setPreferences(arr) {
  let options = ['Browser', 'Operating system', 'Screen width', 'Screen height']
  let functions = [
    getBrowser(navigator.userAgent), getOperatingSystem(navigator.userAgent), 
    getWindowWidth(), getWindowHeight()
  ];
  for (let i = 0; i < arr.length; i++) {
      if (arr[i].checked) {
          setCookie(`${options[i]}`, functions[i], 15);
      }
  }
  allPreferencesRejected(arr);
  print('Cookies saved successfully');
}

function allPreferencesRejected(arr) {
  if (arr.every(element => !element.checked)) {
      setCookie('Cookies', 'All rejected', 15);
  }
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));

  return matches ? decodeURIComponent(matches[1]) : 'rejected';
}

function setCookie(name, value, life) {
  document.cookie = `${name}=${value}; path=/; max-age=${life}; SameSite=Lax`;
}

function cookieCheck() {
  if (document.cookie.length > 0) {
    printAllCookies();
  } else {
    displayModal();
  }
}

function acceptCookies() {
  setAllCookies();
  printAllCookies();
  cookiesDialog.classList.remove('block');
  modal.classList.remove('modal-bg-dark');
}

function setPreferredCookies() {
  setPreferences(inputs);
  modal.classList.remove('modal-bg-dark');
  settingsDialog.classList.remove('block');
  printAllCookies();
}

function resetPreferrences() {
  inputs.checked = true;
}

/*=======================================================*/
/*  Event Listeners                                      */
/*=======================================================*/

listen('load', window, cookieCheck);
listen('load', window, resetPreferrences);
listen('click', settingsButton, displaySettingsDialog);
listen('click', acceptButton, acceptCookies);
listen('click', preferences, setPreferredCookies);