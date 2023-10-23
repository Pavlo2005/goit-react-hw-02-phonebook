import { Component } from 'react';
import { nanoid } from 'nanoid';
import { PhoneForm } from './PhoneForm/PhoneForm';
import { Contacts } from './Contacts/Contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }

  addPhone = newPhone => {
    if (this.state.contacts.find(contact => contact.name === newPhone.name))
      alert(`${newPhone.name} is Olredy in contacts`)
    else
      this.setState(prevState => ({
        contacts: [...prevState.contacts, { ...newPhone, id: nanoid() }],
      }));
  };

  deletePhone = PhoneId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== PhoneId),
    }));
  };

  changeFilter = (value) => {
    this.setState(() => ({
      filter: value,
    }));
  };

  currentContacts = () => {
    const { contacts } = this.state;
    return contacts.filter(contact => {
      const name = contact.name.toLowerCase();
      const filter = this.state.filter.toLowerCase();

      if (name.includes(filter)) return contact;
    });
  }

  render() {
    const contacts = this.currentContacts();

    const { filter } = this.state;

    return (
      <div>
        <PhoneForm onAddPhone={this.addPhone} />
        <Contacts contacts={contacts} onDelete={this.deletePhone} filter={filter} onChange={this.changeFilter}></Contacts>
      </div>
    );
  }
}
