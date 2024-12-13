import Tooltip from './tooltip';

const form = document.querySelector('.form');

const errors = {
  login: {
    valueMissing: 'Представтесь, пожалуйста!',
  },
  email: {
    valueMissing: 'Нам потребуется электропочта...',
    typeMismatch: 'А это точно электропочта?',
  },
  'credit-cart': {
    valueMissing: 'Предоставте нам данные своей кредитной карты, это безопасно, честно',
    patternMismatch: 'Не удалось снять деньги с вашей кредитной карты :(',
  },
};

const tooltipFactory = new Tooltip();

let actuaMessages = [];

const showTooltip = (message, el) => {
  actuaMessages.push({
    name: el.name,
    id: tooltipFactory.showTooltip(message, el),
  });
};

const getError = (el) => {
  const errorKey = Object.keys(ValidityState.prototype).find((key) => {
    if (!el.name) return;
    if (key === 'valid') return;

    return el.validity[key];
  });

  if (!errorKey) return;

  return errors[el.name][errorKey];
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  actuaMessages.forEach((message) => tooltipFactory.removeTooltip(message.id));
  actuaMessages = [];

  if (form.checkVisibility()) {
    console.log('valid');
  } else {
    console.log('invalid');
  }

  const alements = form.elements; // console.dir(alements);

  [...alements].some((elem) => {
    const error = getError(elem);

    if (error) {
      showTooltip(error, elem);

      return true;
    }
  });

  console.log('submit');
});

const elementOnBlur = (e) => {
  const el = e.target;

  const error = getError(el);

  if (error) {
    showTooltip(error, el);
  } else {
    const currentErrorMessage = actuaMessages.find((item) => item.name === el.name);

    if (currentErrorMessage) {
      tooltipFactory.removeTooltip(currentErrorMessage.id);
    }
  }

  el.removeEventListener('blur', elementOnBlur);
};

form.elements.forEach((el) => el.addEventListener('focus', () => {
  el.addEventListener('blur', elementOnBlur);
}));

window.addEventListener('beforeunload', () => {
  const formData = {};

  form.elements.forEach((el) => {
    if (!el.name) {
      return;
    }

    formData[el.name] = el.value;
  });

  localStorage.setItem('formData', JSON.stringify(formData));
});

document.addEventListener('DOMContentLoaded', () => {
  const json = localStorage.getItem('formData');

  let formData;

  try {
    formData = JSON.parse(json);
  } catch (error) {
    console.log(error);
  }

  if (formData) {
    Object.keys(formData).forEach((key) => {
      console.log(Object.keys(formData).forEach((key)));
      // console.log(form.querySelector('[name="${key}"]'));
      form.querySelector('[name="${key}"]').value = formData[key];
    });
  }
});
