import { Box, Button, List, ListItem, ListIcon, Text } from '@chakra-ui/react';
import { MdContacts, MdEmail, MdPhoneInTalk } from 'react-icons/md';
import { useDeleteContactMutation } from 'redux/Reducers/contactsApi';
import { Spinner } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const ContactListItem = ({ id, name, email, phone }) => {
  console.log(id, name, email, phone);
  const [deleteContact, { isLoading, isSuccess }] = useDeleteContactMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const valuesForFields = [
    { icon: MdContacts, field: name },
    { icon: MdEmail, field: email },
    { icon: MdPhoneInTalk, field: phone },
  ];
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
        {valuesForFields.map(({ icon, field }) => {
          return (
            <ListItem key={`${field}`}>
              <ListIcon as={icon} color="green.500" />
              <Text display="inline" pl={4}>
                {field}
              </Text>
            </ListItem>
          );
        })}
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
          onClick={() => {
            deleteContact(id);
            !isSuccess && toast.success('Contact was delete');
          }}
          disabled={isLoading}
        >
          {isLoading && <Spinner size={12} />}
          Delete
        </Button>
      </Box>
    </ListItem>
  );
};
