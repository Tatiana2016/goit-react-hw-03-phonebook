import React, { Component } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const AppContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #2ecc71;
  font-size: 24px;
  margin-bottom: 20px;
`;

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    const existingContact = contacts.find(
      (existingContact) => existingContact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts.`);
    } else {
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  changeFilter = (event) => {
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <AppContainer>
        <Title>Phonebook</Title>
        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChangeFilter={this.changeFilter} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} />
      </AppContainer>
    );
  }
}

export default App;
