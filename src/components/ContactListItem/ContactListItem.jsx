import { Box, Button, List, ListItem, ListIcon, Text } from '@chakra-ui/react';
import { MdContacts, MdEmail, MdPhoneInTalk } from 'react-icons/md';
import { useDeleteContactMutation } from 'redux/Reducers/contactsApi';
import { Spinner } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

export const ContactListItem = ({ id, name, email, phone }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ListItem
      p="3"
      w="100%"
      // key={id}
      borderWidth="1px"
      borderRadius="lg"
      borderStyle="solid"
    >
      <List mb={3}>
        <ListItem>
          <ListIcon as={MdContacts} color="green.500" />
          <Text display="inline" pl={4}>
            {name}
          </Text>
        </ListItem>
        <ListItem>
          <ListIcon as={MdEmail} color="green.500" />
          <Text display="inline" pl={4}>
            {email}
          </Text>
        </ListItem>
        <ListItem>
          <ListIcon as={MdPhoneInTalk} color="green.500" />
          <Text display="inline" pl={4}>
            {phone}
          </Text>
        </ListItem>
      </List>
      <Box align="center" mb={1}>
        <Button
          width="100px"
          h={6}
          mr={4}
          colorScheme="blue"
          boxShadow="0px 10px 13px -7px #000000"
          variant="solid"
          onClick={() => {
            navigate(`edit/${id}`);
            location.state = { id };
          }}
        >
          Edit
        </Button>
        <Button
          width="100px"
          h={6}
          colorScheme="pink"
          boxShadow="0px 10px 13px -7px #000000"
          variant="solid"
          onClick={() => deleteContact(id)}
          disabled={isDeleting}
        >
          {isDeleting && <Spinner size={12} />}
          Delete
        </Button>
      </Box>
    </ListItem>
  );
};
