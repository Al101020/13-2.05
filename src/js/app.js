// import { Tooltip } from "./tooltip";

const form = document.querySelector('.form');

const errors = {
  login: {
    valueMissing: 'Эй, представтесь, пожалуйста!',
  },
  email: {
    valueMissing: 'Нам потребуется электропочта...',
    typeMismatch: 'А это точно електропочта?',
  },
  'credit-cart': {
    valueMissing: 'Предоставте нам данные своей кредитной карты, это безопасно, честно',
    patternMismatch: 'Не удалось снять деньги с вашей кредитной карты :(',
  },
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  //   if (form.checkVisibility()) {
  //     console.log('valid');
  //   } else {
  //     console.log('invalid');
  //   }

  const alements = form.elements; // console.dir(alements);

  const invalid = [...alements].some((el) => Object.keys(ValidityState.prototype).some((key) => {
    if (!el.name) return;
    if (key === 'valid') return;

    if (el.validity[key]) {
      console.log(key);// console.log(el.validity[key]);// console.log(errors[el.name]);
      console.log(errors[el.name][key]);

      el.setCustomValidity(errors[el.name][key]);

      return true;
    }
  }));

  if (invalid) {
    form.reportValidity();
  }

  console.log('submit');
});
