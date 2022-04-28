import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useHomeHook } from 'hooks/Hooks';
import { Box, Heading, Button, Input, List, Container } from '@chakra-ui/react';

import { Spinner } from '@chakra-ui/react';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';

export const Home = () => {
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();
  const { list, isFetching, isLoading } = useHomeHook(filter);
  console.log(list, isFetching, isLoading);

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
          <Heading
            w="100%"
            color="#5b0c9c"
            size="lg"
            fontSize="30px"
            fontWeight="700"
            align="center"
            mb={3}
            p={3}
            borderWidth="3px"
            borderRadius="lg"
            borderStyle="ridge"
            overflow="hidden"
          >
            PHONE BOOK
          </Heading>
          <Button
            mb={3}
            colorScheme="teal"
            boxShadow="0px 10px 13px -7px #000000"
            borderWidth="1px"
            borderStyle="solid"
            variant="solid"
            onClick={() => navigate('/edit')}
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
            !isFetching &&
            !isLoading &&
            list.map(list => <ContactListItem key={list.id} {...list} />)}
        </List>
      </Container>
    </>
  );
};
