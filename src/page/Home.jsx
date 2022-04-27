import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHomeHook } from 'hooks/Hooks';
import {
  Box,
  Heading,
  Button,
  Input,
  List,
  ListItem,
  ListIcon,
  Text,
  Container,
} from '@chakra-ui/react';
import { MdContacts, MdEmail, MdPhoneInTalk } from 'react-icons/md';
import { Spinner } from '@chakra-ui/react';
import { useDeleteContactMutation } from 'redux/Reducers/contactsApi';

export const Home = () => {
  const [filter, setFilter] = useState('');
  console.log(filter);
  const { list, isFetching } = useHomeHook(filter);
  const navigate = useNavigate();

  const onClickRouter = path => navigate(path);

  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  return (
    <>
      <Container
        p={3}
        maxW="sm"
        bg="#fffdde"
        centerContent
        borderLeft="3px"
        borderRight="3px"
        borderBottom={1}
        borderStyle="ridge"
      >
        <Box
          borderWidth="3px"
          borderStyle="ridge"
          position="fixed"
          zIndex="100"
          bg="#fffdde"
          align="center"
          w="sm"
          p={4}
        >
          <Box
            mb={3}
            p={3}
            w="100%"
            borderWidth="3px"
            borderRadius="lg"
            borderStyle="ridge"
            overflow="hidden"
          >
            <Heading
              w="100%"
              color="#5b0c9c"
              size="lg"
              fontSize="30px"
              fontWeight="700"
              align="center"
            >
              PHONE BOOK
            </Heading>
          </Box>
          <Button
            mb={3}
            colorScheme="teal"
            boxShadow="0px 10px 13px -7px #000000"
            borderWidth="1px"
            borderStyle="solid"
            variant="solid"
            onClick={() => onClickRouter('/edit')}
          >
            Add contact...
          </Button>
          <Input
            pl={4}
            variant="flushed"
            defaultValue={`${filter}`}
            onChange={e => setFilter(e.target.value.toLowerCase().trim())}
            placeholder="Input search name..."
          />
        </Box>
        <Box h="225px"></Box>

        <List spacing={5} w="100%">
          {isFetching && <Spinner />}
          {list &&
            list.map(({ id, name, email, phone }) => {
              return (
                <ListItem
                  p="3"
                  w="100%"
                  key={id}
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
                      onClick={() => onClickRouter(`edit/${id}`)}
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
            })}
        </List>
      </Container>
    </>
  );
};
