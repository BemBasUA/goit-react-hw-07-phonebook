import { Box } from './Box/Box';
import { Form } from './Form/Form';
import { Filter } from './Form/Filter/Filter';
import { ContactList } from './Form/ContactList/ContactList';
import shortid from 'shortid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/constactsSlice';
import { fetchContacts, addContact } from 'redux/operations';

export const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts.items);

  const filter = useSelector(state => state.filter);

  const handleSubmit = (name, number) => {
    const contact = {
      name,
      phone: number,
    };
    contact.id = shortid.generate();

    const contactNames = contacts.map(({ name }) => name);

    if (!contactNames.includes(contact.name)) {
      dispatch(addContact(contact));
    } else {
      alert(contact.name + ' is already in contacts.');
    }
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Box>
      <h1>Phonebook</h1>
      <Form onSubmit={handleSubmit}></Form>
      <h2>Contacts</h2>
      <Filter></Filter>
      <ContactList data={visibleContacts} onClick={deleteContact}></ContactList>
    </Box>
  );
};
