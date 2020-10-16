'use strict';

const WIZARDS_DATA = {
  names: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  lastnames: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  coats: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  eyes: [`black`, `red`, `blue`, `yellow`, `green`],
  fireballs: [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`]
};
const keyCodes = {
  ENTER: 13,
  ESC: 27
};
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;
const setupOpen = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupClose = setup.querySelector(`.setup-close`);
const userNameInput = setup.querySelector(`.setup-user-name`);

const onPopupEscPress = (evt) => {
  if (evt.keyCode === keyCodes.ESC && userNameInput !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = () => {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = () => {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === keyCodes.ENTER) {
    setup.classList.remove(`hidden`);
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === keyCodes.ENTER) {
    closePopup();
  }
});

userNameInput.addEventListener(`input`, function () {
  const valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }

  userNameInput.reportValidity();
});

const getRandomValue = (values) => {
  return values[Math.floor(values.length * Math.random())];
};

const changeElementColor = (element, input, arr) => {
  element.addEventListener(`click`, function () {
    const color = getRandomValue(arr);
    if (element.tagName.toLowerCase() === `div`) {
      element.style.backgroundColor = color;
      input.value = color;
    } else {
      element.style.fill = color;
      input.value = color;
    }
  });
};

const wizardCoat = setup.querySelector(`.wizard-coat`);
const wizardEyes = setup.querySelector(`.wizard-eyes`);
const fireball = setup.querySelector(`.setup-fireball-wrap`);
const coatInput = setup.querySelector(`input[name="coat-color"]`);
const eyesInput = setup.querySelector(`input[name="eyes-color"]`);
const fireballInput = setup.querySelector(`input[name="fireball-color"]`);
changeElementColor(wizardCoat, coatInput, WIZARDS_DATA.coats);
changeElementColor(wizardEyes, eyesInput, WIZARDS_DATA.eyes);
changeElementColor(fireball, fireballInput, WIZARDS_DATA.fireballs);

const getRandomWizards = (obj) => {
  const arr = [];
  for (let i = 0; i < 4; i++) {
    arr.push({
      name: getRandomValue(obj.names) + ` ` + getRandomValue(obj.lastnames),
      coatColor: getRandomValue(obj.coats),
      eyesColor: getRandomValue(obj.eyes)
    });
  }

  return arr;
};

const wizards = getRandomWizards(WIZARDS_DATA);

const similarListElement = setup.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const fillSimilarList = (arr) => {
  const fragment = document.createDocumentFragment();
  arr.forEach((element) => {
    fragment.appendChild(renderWizard(element));
  });
  similarListElement.appendChild(fragment);
  document.querySelector(`.setup-similar`).classList.remove(`hidden`);
};

fillSimilarList(wizards);
