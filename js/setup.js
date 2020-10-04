'use strict';

const WIZARDS_DATA = {
  names: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  lastnames: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  coats: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  eyes: [`black`, `red`, `blue`, `yellow`, `green`]
};

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

const similarListElement = userDialog.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const getRandomValue = (values) => {
  return values[Math.floor(values.length * Math.random())];
};

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

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const fillSimilarList = (arr) => {
  const fragment = document.createDocumentFragment();
  for (let j = 0; j < arr.length; j++) {
    fragment.appendChild(renderWizard(arr[j]));
  }
  similarListElement.appendChild(fragment);
  document.querySelector(`.setup-similar`).classList.remove(`hidden`);
};

fillSimilarList(wizards);

