import '../styles/main.css';
import _ from 'lodash';
import contacts from './contacts';

const inputContactForm = document.querySelector('#inputContactForm');
const inputName = document.querySelector('#inputName');
const inputNumber = document.querySelector('#inputNumber');
const inputType = document.querySelector('#inputType');

const showContactForm = document.querySelector('#showContactForm');
const contactType = document.querySelector('#contactType');

const contactContainer = document.querySelector('#contacts');

inputContactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const contact = {
    id: new Date().valueOf()
      .toString(),
    name: inputName.value,
    number: inputNumber.value,
    type: inputType.value,
  };
  contacts.push(contact);
});

showContactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  contactContainer.innerHTML = '';

  _.filter(contacts, contactType.value === 'all' ? {} : { type: contactType.value })
    .forEach(renderContact);
});

const renderContact = (contact) => {
  contactContainer.innerHTML += `
            <li>
                <h4>${contact.name} (${contact.type})</h4>
                <p>${contact.number}</p>
            </li>
   `;
};
