import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';

export const ContactList = ({ data }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.contacts.isLoading);
  const handleClick = id => {
    dispatch(deleteContact(id));
  };
  return (
    <ul>
      {data.map(contact => {
        return (
          <li key={contact.id}>
            {contact.name}: {contact.phone}{' '}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleClick(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  data: PropTypes.array.isRequired,
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }),
};
